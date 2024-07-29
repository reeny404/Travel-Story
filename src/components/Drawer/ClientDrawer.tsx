"use client";

import Drawer from "@/components/Drawer/Drawer";
import useDrawerStore from "@/stores/useDrawerStore";

function ClientDrawer() {
  const { isOpen } = useDrawerStore();

  return isOpen ? <Drawer /> : null;
}

export default ClientDrawer;
