type TimelineModule = typeof import("animejs/timeline");
type UtilsModule = typeof import("animejs/utils");

export type MotionTimeline = ReturnType<TimelineModule["createTimeline"]>;

export const REDUCED_INTERFACE_MOTION_QUERY =
  "(prefers-reduced-motion: reduce), (max-width: 900px), (pointer: coarse)";

export function shouldReduceInterfaceMotion() {
  return window.matchMedia(REDUCED_INTERFACE_MOTION_QUERY).matches;
}

export function supportsFinePointerMotion() {
  return (
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    && window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}

export async function loadEditorialMotion() {
  const [timeline, utils] = await Promise.all([
    import("animejs/timeline"),
    import("animejs/utils"),
  ]);

  return {
    createTimeline: timeline.createTimeline,
    stagger: utils.stagger,
  };
}
