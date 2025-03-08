import { SegmentedControl } from "@mantine/core";
import classes from "./GradientSegmentedControl.module.css";
import { DiscoverFilters } from "../../utils/enums";
import { FilterProps } from "../../utils/interfaces";

export function GradientSegmentedControl({ filter, setFilter }: FilterProps) {
  return (
    <SegmentedControl
      radius="xl"
      size="sm"
      data={Object.values(DiscoverFilters)}
      className={classes.segmentedControl}
      classNames={classes}
      value={filter}
      onChange={(value) => setFilter(value as DiscoverFilters)}
    />
  );
}
