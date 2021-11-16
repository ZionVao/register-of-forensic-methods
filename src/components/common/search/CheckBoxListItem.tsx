import * as React from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';
import { TreeView, TreeItem } from '@mui/lab';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Checked, DomainData, TypeData } from './interfaces';

const createCheckedData = (t: TypeData) => {
  const newValue: Checked = {};
  t.domains.forEach((d) => (newValue[d.id] = { status: false }));
  return newValue;
};

export default function CheckBoxTree(props: {
  domains: TypeData;
  onSearch: (checkBoxPaiload: Checked, key: number) => void;
}) {
  const [checked, setChecked] = React.useState<Checked>(
    createCheckedData(props.domains),
  );

  const handleChangeParent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keys = Object.keys(checked);
    const newValue: Checked = {};
    keys.forEach((k) => (newValue[k] = { status: event.target.checked }));
    setChecked(newValue);
    props.onSearch(newValue, props.domains.id_types);
  };

  const handleChangeChild = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value;
    const newValue: Checked = {
      ...checked,
    };
    newValue[key] = { status: event.target.checked };
    setChecked(newValue);
    props.onSearch(newValue, props.domains.id_types);
  };

  const RenderChild = (domain: DomainData) => {
    const s = checked[domain.id];
    if (!s) {
      const newChecked = checked;
      newChecked[domain.id] = { status: false };
      setChecked(newChecked);
    }

    return (
      <TreeItem
        key={domain.id}
        nodeId={domain.name}
        label={
          <FormControlLabel
            control={
              <Checkbox
                value={domain.id}
                checked={checked[domain.id].status}
                onChange={handleChangeChild}
              />
            }
            label={domain.name}
            key={domain.id}
          />
        }
      />
    );
  };

  const RenderTreeWithCheckboxes = (section: TypeData) => {
    return (
      <TreeItem
        key={section.id_types}
        nodeId={section.name}
        label={
          <FormControlLabel
            control={
              <Checkbox
                indeterminate={
                  Object.keys(checked).some((el) => checked[el].status) !==
                  Object.keys(checked).every((el) => checked[el].status)
                }
                checked={Object.keys(checked).every((el) => checked[el].status)}
                onChange={handleChangeParent}
              />
            }
            label={section.name}
            key={section.id_types}
          />
        }
      >
        {Array.isArray(section.domains)
          ? section.domains.map(RenderChild)
          : null}
      </TreeItem>
    );
  };

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMore />}
      defaultExpandIcon={<ExpandLess />}
      sx={{ flexGrow: 1, width: 500 }}
    >
      {RenderTreeWithCheckboxes(props.domains)}
    </TreeView>
  );
}
