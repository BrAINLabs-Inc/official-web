-- BrAIN Labs - High-Volume Content Seed Data Script (Review-Ready)
-- This script ensures the RA is assigned to the researcher and populates all tables.

BEGIN;

DO $$
DECLARE
    admin_id INT;
    researcher_id INT;
    ra_id INT;
    i INT;
    statuses approval_status_enum[] := ARRAY['DRAFT', 'PENDING_RESEARCHER', 'PENDING_ADMIN', 'APPROVED'];
    status_to_use approval_status_enum;
    creator_id INT;
BEGIN
    -- 1. IDENTIFY EXISTING MEMBERS BY UUID
    SELECT id INTO admin_id FROM member WHERE auth_user_id = 'd9bb30fe-79d1-4997-832c-072cb73c1e74';
    SELECT id INTO researcher_id FROM member WHERE auth_user_id = '1b87068e-07b9-4c9a-965a-cbd3f03eb6d0';
    SELECT id INTO ra_id FROM member WHERE auth_user_id = '5605294f-069a-4291-9bb3-5b8edc8c03da';

    IF admin_id IS NULL OR researcher_id IS NULL OR ra_id IS NULL THEN
        RAISE EXCEPTION 'One or more members not found. Please ensure the UUIDs match registered users.';
    END IF;

    -- 2. ENSURE ASSIGNMENT (Researcher <-> Assistant)
    -- This is critical so the Researcher can see the Assistant''s reviews.
    UPDATE research_assistant 
    SET assigned_by_researcher_id = researcher_id 
    WHERE member_id = ra_id;

    -- 3. CLEANUP EXISTING CONTENT FOR THESE USERS
    DELETE FROM publication WHERE created_by_member_id IN (researcher_id, ra_id);
    DELETE FROM blog WHERE created_by_member_id IN (researcher_id, ra_id);
    DELETE FROM tutorial WHERE created_by_member_id IN (researcher_id, ra_id);
    DELETE FROM project WHERE created_by_member_id IN (researcher_id, ra_id);
    DELETE FROM event WHERE created_by_researcher = researcher_id;
    DELETE FROM grant_info WHERE created_by_researcher = researcher_id;

    -- 4. GENERATE PUBLICATIONS (12 items)
    FOR i IN 1..12 LOOP
        creator_id := CASE WHEN i % 2 = 0 THEN researcher_id ELSE ra_id END;
        -- For RA, we want plenty of PENDING_RESEARCHER items to test the review queue.
        status_to_use := CASE 
            WHEN creator_id = ra_id AND i <= 6 THEN 'PENDING_RESEARCHER'::approval_status_enum
            ELSE statuses[(i % 4) + 1]
        END;

        INSERT INTO publication (title, authors, publication_year, created_by_member_id, approval_status, approved_by_admin_id)
        VALUES (
            'Publication ' || i || ': Neural Pathways of ' || (i * 7),
            'Authors Group ' || i,
            2020 + (i % 5),
            creator_id,
            status_to_use,
            CASE WHEN status_to_use = 'APPROVED' THEN admin_id ELSE NULL END
        );
    END LOOP;

    -- 5. GENERATE BLOGS (12 items)
    FOR i IN 1..12 LOOP
        creator_id := CASE WHEN i % 3 = 0 THEN researcher_id ELSE ra_id END;
        status_to_use := CASE 
            WHEN creator_id = ra_id AND i <= 4 THEN 'PENDING_RESEARCHER'::approval_status_enum
            ELSE statuses[(i % 4) + 1]
        END;

        INSERT INTO blog (title, description, content, created_by_member_id, approval_status, approved_by_admin_id)
        VALUES (
            'Insight Blog #' || i,
            'Brief summary for blog ' || i,
            'Detailed content for blog ' || i || '. Testing review workflow visibility.',
            creator_id,
            status_to_use,
            CASE WHEN status_to_use = 'APPROVED' THEN admin_id ELSE NULL END
        );
    END LOOP;

    -- 6. GENERATE PROJECTS (12 items)
    FOR i IN 1..12 LOOP
        creator_id := CASE WHEN i % 2 = 0 THEN ra_id ELSE researcher_id END;
        status_to_use := CASE 
            WHEN creator_id = ra_id AND i <= 6 THEN 'PENDING_RESEARCHER'::approval_status_enum
            ELSE statuses[(i % 4) + 1]
        END;

        INSERT INTO project (title, description, content, created_by_member_id, approval_status, approved_by_admin_id)
        VALUES (
            'Research Project ' || CHR(64 + i),
            'Overview of project ' || i,
            'Technical specifications for neural project ' || i,
            creator_id,
            status_to_use,
            CASE WHEN status_to_use = 'APPROVED' THEN admin_id ELSE NULL END
        );
    END LOOP;

    -- 7. GENERATE TUTORIALS (12 items)
    FOR i IN 1..12 LOOP
        creator_id := CASE WHEN i % 2 = 0 THEN ra_id ELSE researcher_id END;
        status_to_use := CASE 
            WHEN creator_id = ra_id AND i <= 6 THEN 'PENDING_RESEARCHER'::approval_status_enum
            ELSE statuses[(i % 4) + 1]
        END;

        INSERT INTO tutorial (title, description, content, created_by_member_id, approval_status, approved_by_admin_id)
        VALUES (
            'Tutorial Module ' || i,
            'Learn the basics of level ' || i,
            'Step-by-step instructions for cognitive training.',
            creator_id,
            status_to_use,
            CASE WHEN status_to_use = 'APPROVED' THEN admin_id ELSE NULL END
        );
    END LOOP;

    -- 8. GENERATE EVENTS (12 items - Researcher Only)
    FOR i IN 1..12 LOOP
        status_to_use := CASE WHEN i % 2 = 0 THEN 'APPROVED'::approval_status_enum ELSE 'PENDING_ADMIN'::approval_status_enum END;
        INSERT INTO event (title, event_type, description, event_datetime, premises, host, created_by_researcher, approval_status, approved_by_admin_id)
        VALUES (
            'Lab Event ' || i,
            'Workshop',
            'Event description for ' || i,
            NOW() + (i || ' days')::interval,
            'Room ' || (100 + i),
            'Dr. Alice Smith',
            researcher_id,
            status_to_use,
            CASE WHEN status_to_use = 'APPROVED' THEN admin_id ELSE NULL END
        );
    END LOOP;

    -- 9. GENERATE GRANTS (12 items - Researcher Only)
    FOR i IN 1..12 LOOP
        status_to_use := CASE WHEN i % 2 = 0 THEN 'APPROVED'::approval_status_enum ELSE 'PENDING_ADMIN'::approval_status_enum END;
        INSERT INTO grant_info (title, description, passed_date, expire_date, created_by_researcher, approval_status, approved_by_admin_id)
        VALUES (
            'Grant Proposal #' || i,
            'Funding details for ' || i,
            '2024-01-01',
            '2026-01-01',
            researcher_id,
            status_to_use,
            CASE WHEN status_to_use = 'APPROVED' THEN admin_id ELSE NULL END
        );
    END LOOP;

END $$;

COMMIT;
