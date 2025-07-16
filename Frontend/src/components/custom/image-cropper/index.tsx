import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { removeBackground } from "@imgly/background-removal";
import {
  CircleStencil,
  Cropper,
  CropperPreview,
  CropperPreviewRef,
  CropperRef,
  CropperState,
  ImageRestriction,
  Priority,
} from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { FaSearchMinus, FaSearchPlus } from "react-icons/fa";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  CircleDashed,
  RotateCcw,
  RotateCw,
  SquareDashed,
  FlipHorizontal,
  FlipVertical,
  LockOpen,
  Lock,
  Loader2Icon,
} from "lucide-react";
import CustomTooltip from "../tooltip";
import { Button } from "@/components/ui/button";

interface CropComponentProps {
  imageSrc?: string;
  defaultStencil?: "circle" | "rectangle";
  undefinedImageMessage?: string;
  defaultVisibleArea?: (state: CropperState) => {
    width: number;
    height: number;
    left: number;
    top: number;
  };
}

export interface CropperMethods {
  getResult: () => string | null;
}

const ImageCropper = forwardRef<CropperMethods, CropComponentProps>(
  (
    {
      imageSrc,
      defaultStencil = "circle",
      undefinedImageMessage = "Carrregue uma imagem",
      defaultVisibleArea = ({ imageSize }: CropperState) => ({
        width: 500,
        height: 500,
        left: imageSize.width - 450,
        top: 0,
      }),
    },
    ref
  ) => {
    const cropperRef = useRef<CropperRef>(null);
    const previewRef = useRef<CropperPreviewRef>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [progressText, setProgressText] = useState("");

    const [currentStencil, setCurrentStencil] = useState<
      "circle" | "rectangle"
    >(defaultStencil);
    const [stencilMovable, setStencilMovable] = useState(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    const handleUpdate = (cropper: CropperRef) => {
      previewRef.current?.update(cropper);
    };

    const handleZoom = (factor: number) => {
      cropperRef.current?.zoomImage(factor);
    };

    const handleMove = (x: number, y: number) => {
      cropperRef.current?.moveImage(x, y);
    };

    const handleFlip = (direction: "horizontal" | "vertical") => {
      cropperRef.current?.flipImage(
        direction === "horizontal" ? true : false,
        direction === "vertical" ? true : false
      );
    };

    const handleRotate = (angle: number) => {
      cropperRef.current?.rotateImage(angle);
    };

    const handleRepeat = (action: () => void) => {
      action();
      const id = setInterval(action, 100);
      setIntervalId(id);
    };

    const clearRepeat = () => {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    };

    const handleReset = () => {
      cropperRef.current?.reset();
    };

    useImperativeHandle(ref, () => ({
      getResult: () => {
        const cropper = cropperRef.current;
        if (cropper) {
          const canvas = cropperRef.current.getCanvas();
          if (canvas) {
            return canvas.toDataURL("image/png");
          }
        }
        return null;
      },
    }));

    const removeImageBg = useCallback(async () => {
      if (!imageSrc) return;

      setLoading(true);
      try {
        const resultBlob = await removeBackground(imageSrc, {
          progress: (_, current, total) => {
            setProgressText(`Etapa ${current} de ${total}`);
          },
          output: {
            quality: 100,
          },
        });

        setResult(URL.createObjectURL(resultBlob));
        cropperRef.current?.setCoordinates(({ imageSize, visibleArea }) => {
          return {
            width: (visibleArea || imageSize).width,
            height: (visibleArea || imageSize).height,
          };
        });
      } catch (error) {
        console.error("Erro ao remover fundo:", error);
      } finally {
        setLoading(false);
      }
    }, [imageSrc]);

    useEffect(() => {
      setLoading(false);
    }, [imageSrc]);

    return (
      <div className="flex relative gap-2 justify-between flex-wrap rounded-md overflow-hidden">
        <section className="flex gap-3 flex-wrap mx-auto">
          <div className="flex flex-col gap-2">
            <CustomTooltip content="Mover para cima">
              <Button
                onMouseDown={() => handleRepeat(() => handleMove(0, -10))}
                onMouseUp={clearRepeat}
                onMouseLeave={clearRepeat}
              >
                <ArrowUp size={20} />
              </Button>
            </CustomTooltip>
            <CustomTooltip content="Mover para baixo">
              <Button
                onMouseDown={() => handleRepeat(() => handleMove(0, 10))}
                onMouseUp={clearRepeat}
                onMouseLeave={clearRepeat}
              >
                <ArrowDown size={20} />
              </Button>
            </CustomTooltip>
            <CustomTooltip content="Mover para a esquerda">
              <Button
                onMouseDown={() => handleRepeat(() => handleMove(-10, 0))}
                onMouseUp={clearRepeat}
                onMouseLeave={clearRepeat}
              >
                <ArrowLeft size={20} />
              </Button>
            </CustomTooltip>
            <CustomTooltip content="Mover para a direita">
              <Button
                onMouseDown={() => handleRepeat(() => handleMove(10, 0))}
                onMouseUp={clearRepeat}
                onMouseLeave={clearRepeat}
              >
                <ArrowRight size={20} />
              </Button>
            </CustomTooltip>
            <CustomTooltip content="Aumentar zoom">
              <Button
                onMouseDown={() => handleRepeat(() => handleZoom(1.1))}
                onMouseUp={clearRepeat}
                onMouseLeave={clearRepeat}
              >
                <FaSearchPlus size={19} />
              </Button>
            </CustomTooltip>
          </div>
          <div className="flex flex-col gap-2">
            <CustomTooltip content="Reduzir zoom">
              <Button
                onMouseDown={() => handleRepeat(() => handleZoom(0.9))}
                onMouseUp={clearRepeat}
                onMouseLeave={clearRepeat}
              >
                <FaSearchMinus size={19} />
              </Button>
            </CustomTooltip>
            <CustomTooltip content="Redefinir ajustes">
              <Button onClick={handleReset}>
                <RotateCcw />
              </Button>
            </CustomTooltip>
            <CustomTooltip content="Rotacionar 90° para a direita">
              <Button onClick={() => handleRotate(90)}>
                <RotateCw />
              </Button>
            </CustomTooltip>
            <CustomTooltip content="Espelhar horizontalmente">
              <Button onClick={() => handleFlip("horizontal")}>
                <FlipHorizontal />
              </Button>
            </CustomTooltip>
            <CustomTooltip content="Espelhar verticalmente">
              <Button onClick={() => handleFlip("vertical")}>
                <FlipVertical />
              </Button>
            </CustomTooltip>
          </div>
        </section>
        <section className="flex flex-col mx-auto gap-2 justify-between">
          <div className="flex gap-2 justify-between">
            <CustomTooltip content="Selecionar recorte circular">
              <Button
                variant={currentStencil === "circle" ? "default" : "ghost"}
                onClick={() => setCurrentStencil("circle")}
              >
                <CircleDashed size={20} />
              </Button>
            </CustomTooltip>
            <CustomTooltip content="Selecionar recorte retangular">
              <Button
                variant={currentStencil === "rectangle" ? "default" : "ghost"}
                onClick={() => setCurrentStencil("rectangle")}
              >
                <SquareDashed size={20} />
              </Button>
            </CustomTooltip>
            <CustomTooltip content="Bloquear ou desbloquear área de recorte">
              <Button
                onClick={() => setStencilMovable(!stencilMovable)}
                variant={stencilMovable ? "ghost" : "default"}
              >
                {stencilMovable ? <LockOpen /> : <Lock />}
              </Button>
            </CustomTooltip>
          </div>
          {imageSrc ? (
            loading ? (
              <div className="size-[180px] flex flex-col gap-2 items-center justify-center">
                <Loader2Icon className="animate-spin text-ipilOrange" />

                <p className="text-sm text-ipilOrange">{progressText}</p>
                <p className="text-sm text-ipilOrange">A remover fundo...</p>
              </div>
            ) : (
              <Cropper
                ref={cropperRef}
                src={result ?? imageSrc}
                defaultVisibleArea={defaultVisibleArea}
                priority={Priority.visibleArea}
                className="size-[180px] mx-auto border-ipilOrange rounded-md border-2"
                stencilComponent={
                  currentStencil === "circle" ? CircleStencil : undefined
                }
                boundaryClassName="cursor-grab"
                onUpdate={handleUpdate}
                stencilProps={{
                  movable: stencilMovable,
                  resizable: true,
                }}
                transformImage={{
                  adjustStencil: false,
                }}
                imageRestriction={ImageRestriction.stencil}
              />
            )
          ) : (
            <div className="flex h-full items-center justify-center">
              {undefinedImageMessage}
            </div>
          )}
          <Button onClick={removeImageBg} className="w-full" disabled={loading || !imageSrc}>
            Remover Fundo
          </Button>
        </section>{" "}
        <div className="flex flex-col mx-auto justify-center items-center gap-4">
          <h2>Resultado</h2>
          <CropperPreview
            ref={previewRef}
            className="border-ipilOrange border rounded-md size-32"
          />
        </div>
      </div>
    );
  }
);

export default ImageCropper;
