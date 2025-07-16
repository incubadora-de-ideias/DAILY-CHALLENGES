import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import CustomTooltip from "../tooltip";

type Step = {
  label: string;
  completed: boolean;
};

type StepProgressbarProps = {
  steps: Step[];
  onStepClick?: (step: number) => void;
};

export const StepProgressbar: React.FC<StepProgressbarProps> = ({
  steps,
  onStepClick,
}) => {
  const currentStep = steps.findIndex((step) => !step.completed);
  const clampedStep = currentStep === -1 ? steps.length : currentStep;
  const progressRatio = steps.length > 0 ? clampedStep / steps.length : 0;

  return (
    <div className="relative w-full">
      {/* Linha de fundo */}
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 rounded-full -translate-y-1/2 overflow-hidden" />

      {/* Barra animada */}
      <motion.div
        className="absolute top-[calc(50%)] left-0 h-1 bg-ipilOrange rounded-full -translate-y-1/2"
        initial={{ width: 0 }}
        animate={{ width: `${progressRatio * 100}%` }}
        transition={{ duration: 0.7 }}
      />

      {/* Steps */}
      <div className="relative flex justify-between gap-2 items-center z-10 px-2">
        {steps.map((step, index) => {
          const isCompleted = step.completed;
          const isActive = index === currentStep;

          return (
            <CustomTooltip content={step.label} key={index}>
              <div
                onClick={() => onStepClick?.(index)}
                className="size-8 flex items-center justify-center rounded-full border-2 text-sm font-medium cursor-pointer transition-all group"
                style={{ minWidth: 30 }}
              >
                <div
                  className={cn(
                    "w-full h-full flex items-center justify-center rounded-full transition-all",
                    {
                      "bg-ipilOrange text-white border-ipilOrange": isCompleted,
                      "bg-white text-ipilOrange border-ipilOrange ring-2 ring-ipilOrange":
                        isActive,
                      "bg-gray-200 text-gray-500 border-gray-300":
                        !isCompleted && !isActive,
                    }
                  )}
                >
                  {isCompleted ? (
                    <Check size={14} />
                  ) : (
                    <>
                      {index + 1}
                      {!isCompleted && !isActive && (
                        <span className="text-red-500 ml-1 font-bold">!</span>
                      )}
                    </>
                  )}
                </div>
              </div>
            </CustomTooltip>
          );
        })}
      </div>
    </div>
  );
};
