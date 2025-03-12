import clsx from "clsx";
import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({
  children,
  open,
  classes,
}: {
  children: ReactNode;
  open: boolean;
  classes?: string;
}) => {
  const dialog = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const modal = dialog.current;
    if (open && modal) {
      modal.showModal();
    }
    return () => modal!.close();
  }, [open]);

  return createPortal(
    <dialog
      ref={dialog}
      className={clsx(
        "backdrop:bg-stone-900/90 transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute bg-stone-200 rounded-md border-none shadow-lg p-4 w-4/5 max-w-2xl animate-fade-slide-up backdrop-brightness-50 backdrop-blur-sm",
        classes
      )}
    >
      {children}
    </dialog>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;
