import Graphic from "@arcgis/core/Graphic.js";
import Collection from "@arcgis/core/core/Collection.js";
import { useState } from "react";

export function replacePreviewSymbol(
  graphics: Collection<Graphic>,
  symbol: Graphic["symbol"],
): Collection<Graphic> {
  const graphic = graphics.getItemAt(0);
  if (!graphic) {
    throw new Error("Symbol preview requires a graphic.");
  }

  const updatedGraphic = graphic.clone();
  updatedGraphic.symbol = symbol;
  return new Collection([updatedGraphic]);
}

export function useSymbolPreview(
  initialGeometry: Graphic["geometry"],
  initialSymbol: Graphic["symbol"],
): {
  graphics: Collection<Graphic>;
  updatePreview: (symbol: Graphic["symbol"]) => void;
} {
  const [graphics, setGraphics] = useState(
    () =>
      new Collection([
        new Graphic({ geometry: initialGeometry, symbol: initialSymbol }),
      ]),
  );

  const updatePreview = (symbol: Graphic["symbol"]): void => {
    setGraphics((previous) => replacePreviewSymbol(previous, symbol));
  };

  return { graphics, updatePreview };
}
