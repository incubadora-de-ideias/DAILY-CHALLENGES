import React, {
  useState,
  Children,
  useRef,
  HTMLAttributes,
  ReactNode,
} from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "./button";

type StepSetter = (step: number) => void;
interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  initialStep?: number;
  onStepChange?: (step: number, stepSetter: StepSetter) => void;
  onFinalStepCompleted?: (stepSetter: StepSetter) => void;
  stepCircleContainerClassName?: string;
  stepContainerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  backButtonText?: string;
  nextButtonText?: string;
  finishText?: string;
  disableStepIndicators?: boolean;
  nextDisabled?: boolean;
  backDisabled?: boolean;
  disabledSteps?: number[];
  disableNextSteps?: boolean;
  stepsValidations?: ((() => boolean) | null)[];
  renderStepIndicator?: (props: {
    step: number;
    currentStep: number;
    onStepClick: (clicked: number) => void;
  }) => ReactNode;
}

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange,
  onFinalStepCompleted = () => {},
  stepCircleContainerClassName = "",
  stepContainerClassName = "",
  contentClassName = "",
  footerClassName = "",
  backButtonProps = { type: "button" },
  nextButtonProps = { type: "button" },
  backButtonText = "Back",
  nextButtonText = "Continue",
  disableStepIndicators = false,
  renderStepIndicator,
  finishText = "Completar",
  nextDisabled = false,
  disabledSteps,
  disableNextSteps,
  stepsValidations = [],
  ...rest
}: StepperProps) {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [direction, setDirection] = useState<number>(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  const updateStep = (newStep: number) => {
    if (newStep > totalSteps) {
      onFinalStepCompleted(setCurrentStep);
      return;
    }

    // Se estiver avançando
    if (newStep > currentStep) {
      for (let i = currentStep - 1; i < newStep - 1; i++) {
        const validateStep = stepsValidations[i];
        const passed = validateStep ? validateStep() : true;

        if (!passed) {
          // Para no step que falhou
          setCurrentStep(i + 1);
          return;
        }
      }
    }

    // Se estiver recuando ou avançando após validações bem-sucedidas
    if (onStepChange) {
      onStepChange(newStep, setCurrentStep);
    } else {
      setCurrentStep(newStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1 && !backButtonProps.disabled) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep && (!nextDisabled || !nextButtonProps.disabled)) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    setDirection(1);
    updateStep(totalSteps + 1);
  };

  return (
    <div
      className="flex min-h-full flex-1 flex-col items-center justify-center p-4 sm:aspect-[4/3] md:aspect-[2/1]"
      {...rest}
    >
      <div
        className={
          stepCircleContainerClassName ??
          `mx-auto flex h-full max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-4xl shadow-xl`
        }
        style={
          stepCircleContainerClassName
            ? undefined
            : { border: "1px solid #222" }
        }
      >
        {/* Step Indicators */}
        <div
          className={`flex w-full custom_scroll items-center p-6 shrink-0 ${stepContainerClassName}`}
        >
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1;
            const isNotLastStep = index < totalSteps - 1;
            return (
              <React.Fragment key={stepNumber}>
                {renderStepIndicator ? (
                  renderStepIndicator({
                    step: stepNumber,
                    currentStep,
                    onStepClick: (clicked) => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    },
                  })
                ) : (
                  <StepIndicator
                    step={stepNumber}
                    disableStepIndicators={disableStepIndicators}
                    currentStep={currentStep}
                    onClickStep={(clicked) => {
                      if (disabledSteps?.includes(clicked)) return;
                      if (disableNextSteps && clicked > currentStep + 1) return;
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    }}
                  />
                )}
                {isNotLastStep && (
                  <StepConnector isComplete={currentStep > stepNumber} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto custom_scroll h-full px-2">
          <StepContentWrapper
            isCompleted={isCompleted}
            currentStep={currentStep}
            direction={direction}
            className={`space-y-2 py-4 ${contentClassName}`}
          >
            {stepsArray[currentStep - 1]}
          </StepContentWrapper>
        </div>

        {/* Footer Buttons */}
        {!isCompleted && (
          <div
            className={`sticky bottom-0 w-full bg-white px-6 pt-4 border-t border-gray-200 ${footerClassName}`}
          >
            <div
              className={`flex w-full ${
                currentStep !== 1 ? "justify-between" : "justify-end"
              }`}
            >
              {currentStep !== 1 && (
                <button
                  onClick={handleBack}
                  className="duration-350 flex gap-2 items-center rounded px-2 py-1 transition text-neutral-400 hover:text-neutral-700"
                  {...backButtonProps}
                >
                  <ArrowLeft />
                  {backButtonText}
                </button>
              )}
              <Button
                onClick={isLastStep ? handleComplete : handleNext}
                className="transition-all flex items-center gap-2 justify-center bg-ipilOrange py-1.5 px-3.5 font-medium tracking-tight text-white hover:bg-ipilOrange active:bg-ipilOrangeLight"
                type={isLastStep ? "submit" : nextButtonProps.type}
                {...nextButtonProps}
              >
                {isLastStep ? finishText : nextButtonText}{" "}
                {isLastStep ? <Check /> : <ArrowRight />}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface StepContentWrapperProps {
  isCompleted: boolean;
  currentStep: number;
  direction: number;
  children: ReactNode;
  className?: string;
}

function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  children,
  className = "",
}: StepContentWrapperProps) {
  // const [parentHeight, setParentHeight] = useState<number>(0);

  return (
    <motion.div
      style={{
        position: "relative",
        overflow: "visible", // 👈 allow overflow
        flex: 1, // 👈 take available space
        display: isCompleted ? "none" : "block", // hide if completed
      }}
      className={className}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition
            key={currentStep}
            direction={direction}
            // onHeightReady={(h) => setParentHeight(h)}
          >
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface SlideTransitionProps {
  children: ReactNode;
  direction: number;
  // onHeightReady: (height: number) => void;
}

function SlideTransition({
  children,
  direction,
}: // onHeightReady,
SlideTransitionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // useLayoutEffect(() => {
  //   if (containerRef.current) {
  //     onHeightReady(containerRef.current.offsetHeight);
  //   }
  // }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
      style={{ position: "absolute", left: 0, right: 0, top: 0 }}
    >
      {children}
    </motion.div>
  );
}

const stepVariants: Variants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? "-100%" : "100%",
    opacity: 0,
  }),
  center: {
    x: "0%",
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? "50%" : "-50%",
    opacity: 0,
  }),
};

type StepProps = HTMLAttributes<HTMLDivElement> & {};

export function Step({ children, ...rest }: StepProps) {
  return <div {...rest}>{children}</div>;
}

interface StepIndicatorProps {
  step: number;
  currentStep: number;
  onClickStep: (clicked: number) => void;
  disableStepIndicators?: boolean;
}

function StepIndicator({
  step,
  currentStep,
  onClickStep,
  disableStepIndicators = false,
}: StepIndicatorProps) {
  const status =
    currentStep === step
      ? "active"
      : currentStep < step
      ? "inactive"
      : "complete";

  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) {
      onClickStep(step);
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      className="relative cursor-pointer outline-none focus:outline-none"
      animate={status}
      initial={false}
    >
      <motion.div
        variants={{
          inactive: { scale: 1, backgroundColor: "#2c2c30", color: "#FFFFFF" },
          active: { scale: 1, backgroundColor: "#D96F32", color: "#00d8ff" },
          complete: { scale: 1, backgroundColor: "#D96F32", color: "#a3a3a3" },
        }}
        transition={{ duration: 0.3 }}
        className="flex h-8 w-8 items-center justify-center rounded-full font-semibold"
      >
        {status === "complete" ? (
          <CheckIcon strokeWidth={3} className="size-5 text-white" />
        ) : status === "active" ? (
          <div className="h-3 w-3 rounded-full bg-ipilGray" />
        ) : (
          <span className="text-sm">{step}</span>
        )}
      </motion.div>
    </motion.div>
  );
}

interface StepConnectorProps {
  isComplete: boolean;
}

function StepConnector({ isComplete }: StepConnectorProps) {
  const lineVariants: Variants = {
    incomplete: { width: 0, backgroundColor: "rgba(217, 111, 50, 0)" },
    complete: { width: "100%", backgroundColor: "#D96F32" },
  };

  return (
    <div className="relative mx-2 h-0.5 flex-1 overflow-hidden rounded bg-ipilGray">
      <motion.div
        className="absolute left-0 top-0 h-full"
        variants={lineVariants}
        initial={false}
        animate={isComplete ? "complete" : "incomplete"}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

type CheckIconProps = React.SVGProps<SVGSVGElement> & {};

function CheckIcon(props: CheckIconProps) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      {...props}
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: 0.1,
          type: "tween",
          ease: "easeOut",
          duration: 0.3,
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
