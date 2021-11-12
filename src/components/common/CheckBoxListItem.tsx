import * as React from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';
import { TreeView, TreeItem } from '@mui/lab';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const mockData = [
  {
    name: 'Комплексна експертиза',
    code: '0',
    subsections: [{ name: 'Комплексна експертиза', code: '0' }],
  },
  {
    name: 'Почеркознавча і лінгвістична експертиза',
    code: '1',
    subsections: [
      { name: 'Дослідження почерку і підписів', code: '1.1' },
      { name: 'Лінгвістичне дослідження писемного мовлення', code: '1.2' },
    ],
  },
  {
    name: 'Технічна експертиза документів',
    code: '2',
    subsections: [
      {
        name: 'Дослідження реквізитів документів',
        code: '2.1',
      },
      {
        name: 'Дослідження матеріалів документів',
        code: '2.2',
      },
      {
        name: 'Дослідження друкарських форм та інших засобів виготовлення документів',
        code: '2.3',
      },
    ],
  },
];

interface Subsection {
  name: string;
  code: string;
}

interface Section {
  name: string;
  code: string;
  subsections: Subsection[];
}

function createSubsection(e: { name: string; code: string }): Subsection {
  return { name: e.name, code: e.code };
}

const sectionsT: Section[] = mockData.map((e) => {
  return {
    name: e.name,
    code: e.code,
    subsections: e.subsections.map(createSubsection),
  };
});

type Checked = { [key: string]: { status: boolean } };

export default function NestedList() {
  // prop: {
  // section: Section;
  // handleChangeCheck: (id: string) => void;
  // }
  const [checked, setChecked] = React.useState<Checked>({});

  const handleChangeParent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keys = Object.keys(checked);
    const newValue: Checked = {};
    keys.forEach((k) => (newValue[k] = { status: event.target.checked }));
    setChecked(newValue);
  };

  const handleChangeChild = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value;
    const newValue: Checked = {
      ...checked,
    };
    newValue[key] = { status: event.target.checked };
    setChecked(newValue);
  };

  const RenderChild = (sub: Subsection) => {
    const s = checked[sub.code];
    if (!s) {
      const newChecked = checked;
      newChecked[sub.code] = { status: false };
      setChecked(newChecked);
    }
    return (
      <TreeItem
        key={sub.code}
        nodeId={sub.code}
        label={
          <FormControlLabel
            control={
              <Checkbox
                value={sub.code}
                checked={checked[sub.code].status}
                onChange={handleChangeChild}
              />
            }
            label={`${sub.code} - ${sub.name}`}
            key={sub.code}
          />
        }
      />
    );
  };

  const RenderTreeWithCheckboxes = (sections: Section) => {
    return (
      <TreeItem
        key={sections.code}
        nodeId={sections.code}
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
            label={`${sections.code} - ${sections.name}`}
            key={sections.code}
          />
        }
      >
        {Array.isArray(sections.subsections)
          ? sections.subsections.map(RenderChild)
          : null}
      </TreeItem>
    );
  };

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMore />}
      defaultExpandIcon={<ExpandLess />}
    >
      {RenderTreeWithCheckboxes(sectionsT[1])}
    </TreeView>
  );
}
