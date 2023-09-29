//
import ListItemButton from "./ListItemButton";
import Card from "./Card"

// ----------------------------------------------------------------------

export default function CustomMui(theme) {
  return Object.assign(
    ListItemButton(theme),
    Card(theme)
  );
}
