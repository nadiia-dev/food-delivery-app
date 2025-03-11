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
  classes: string;
}) => {
  const dialog = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (open && dialog.current) {
      dialog.current.showModal();
    }
  }, [open]);

  return createPortal(
    <dialog
      ref={dialog}
      className={clsx(
        "bg-stone-200 rounded-md border-none shadow-lg p-4 w-4/5 max-w-2xl animate-fade-slide-up",
        classes
      )}
    >
      {children}
    </dialog>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;
