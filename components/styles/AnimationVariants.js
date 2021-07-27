const RotateYVariants = {
  initial: {
    opacity: 0,
    rotateY: 90,
  },
  animate: {
    opacity: 1,
    rotateY: 0,
    transition: {
      duration: 1,
    },
  },
};

const RotateXVariants = {
  initial: {
    opacity: 0,
    rotateX: 90,
  },
  animate: {
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 1,
    },
  },
};

export { RotateXVariants, RotateYVariants };
