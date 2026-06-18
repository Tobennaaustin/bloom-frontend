import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimationType = "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale";

const itemVariants: Record<AnimationType, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-in": {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: -28 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: 28 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
  },
};

const viewport = { once: true, margin: "-60px" as const };
const ease = [0.25, 0.1, 0.25, 1] as const;

type AnimateOnScrollProps = HTMLMotionProps<"div"> & {
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  /** Use on-load animation instead of scroll trigger (e.g. hero) */
  onMount?: boolean;
};

export function AnimateOnScroll({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  duration = 0.55,
  onMount = false,
  ...props
}: AnimateOnScrollProps) {
  return (
    <motion.div
      initial="hidden"
      animate={onMount ? "visible" : undefined}
      whileInView={onMount ? undefined : "visible"}
      viewport={onMount ? undefined : viewport}
      variants={itemVariants[animation]}
      transition={{ duration, delay, ease }}
      className={cn(className)}
      {...props}>
      {children}
    </motion.div>
  );
}

type StaggerContainerProps = HTMLMotionProps<"div"> & {
  stagger?: number;
  delayChildren?: number;
};

export function StaggerContainer({
  children,
  className,
  stagger = 0.1,
  delayChildren = 0,
  ...props
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
      className={cn(className)}
      {...props}>
      {children}
    </motion.div>
  );
}

type StaggerItemProps = HTMLMotionProps<"div"> & {
  animation?: AnimationType;
  duration?: number;
};

export function StaggerItem({
  children,
  className,
  animation = "fade-up",
  duration = 0.5,
  ...props
}: StaggerItemProps) {
  return (
    <motion.div
      variants={itemVariants[animation]}
      transition={{ duration, ease }}
      className={cn(className)}
      {...props}>
      {children}
    </motion.div>
  );
}
