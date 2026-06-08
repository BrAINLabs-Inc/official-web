import { motion } from 'framer-motion';

interface DataUnavailableProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const DataUnavailable = ({
  title = 'Data Currently Unavailable',
  description = 'Currently, data cannot be fetched or is unavailable. Please try again later.',
  actionLabel,
  onAction,
}: DataUnavailableProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      {/* Animated SVG */}
      <motion.div
        className="mb-6"
        animate={{
          y: [0, -6, 0],
          rotate: [0, 3, -3, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          width="120"
          height="100"
          viewBox="0 0 120 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-muted-foreground/25"
        >
          {/* Database cylinder */}
          <motion.g
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ellipse cx="60" cy="30" rx="35" ry="12" fill="currentColor" />
            <path
              d="M25 30V65C25 71.6 38.5 76 60 76C81.5 76 95 71.6 95 65V30"
              fill="currentColor"
              opacity="0.7"
            />
            <ellipse cx="60" cy="65" rx="35" ry="12" fill="currentColor" opacity="0.5" />
            {/* Lines on database */}
            <path d="M35 45H85" stroke="currentColor" strokeWidth="2" opacity="0.4" />
            <path d="M35 55H85" stroke="currentColor" strokeWidth="2" opacity="0.4" />
          </motion.g>
          {/* Exclamation mark */}
          <motion.g
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <circle cx="85" cy="25" r="10" fill="currentColor" className="text-destructive/20" />
            <text
              x="85"
              y="30"
              textAnchor="middle"
              className="fill-destructive/60 text-sm font-bold"
            >
              !
            </text>
          </motion.g>
          {/* Dotted particles */}
          {[
            { cx: 20, cy: 20, delay: 0 },
            { cx: 100, cy: 35, delay: 0.5 },
            { cx: 30, cy: 75, delay: 1 },
            { cx: 90, cy: 80, delay: 1.5 },
          ].map((dot, i) => (
            <motion.circle
              key={i}
              cx={dot.cx}
              cy={dot.cy}
              r="2.5"
              fill="currentColor"
              className="text-primary/50"
              animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
              transition={{ duration: 2, delay: dot.delay, repeat: Infinity }}
            />
          ))}
        </svg>
      </motion.div>

      <h3 className="mb-2 text-base font-bold text-foreground">{title}</h3>
      <p className="mb-4 max-w-md text-sm text-muted-foreground">{description}</p>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="text-xs font-medium text-primary underline-offset-4 hover:underline"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
};
