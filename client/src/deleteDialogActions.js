export const OPEN_DELETE_DIALOG = "OPEN_DELETE_DIALOG";
export const CLOSE_DELETE_DIALOG = "CLOSE_DELETE_DIALOG";

export const openDeleteDialogAction = astronaut => ({
  type: OPEN_DELETE_DIALOG,
  astronaut
});

export const closeDeleteDialogAction = () => ({
  type: CLOSE_DELETE_DIALOG
});
