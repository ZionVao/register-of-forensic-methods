import * as React from 'react';
import {
  ListSubheader,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  FormControlLabel,
  Checkbox,
  Box,
  Grid,
  ListItem,
} from '@mui/material';

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
  checked: boolean;
}

interface Section {
  name: string;
  code: string;
  checked: boolean;
  subsections: Subsection[];
}

function createSubsection(e: { name: string; code: string }): Subsection {
  return { name: e.name, code: e.code, checked: false };
}

const sectionsT: Section[] = mockData.map((e) => {
  return {
    name: e.name,
    code: e.code,
    checked: false,
    subsections: e.subsections.map(createSubsection),
  };
});

export default function NestedList() {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState([true, false]);

  const handleClick = () => {
    setOpen(!open);
  };
  ////

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked]);
  };

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label="Child 1"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Child 2"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
    </Box>
  );

  const checkBox = (
    <FormControlLabel
      label="Parent"
      control={
        <Checkbox
          checked={checked[0] && checked[1]}
          indeterminate={checked[0] !== checked[1]}
          onChange={handleChange1}
        />
      }
    />
  );

  return (
    // <div>
    //   {checkBox}
    //   {children}
    // </div>
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }
    >
      {sectionsT.map((s) => {
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
            <FormControlLabel
              label={<ListItemText primary={`${s.code} - ${s.name}`} />}
              control={
                <Checkbox
                  checked={checked[0] && checked[1]}
                  indeterminate={checked[0] !== checked[1]}
                  onChange={handleChange1}
                />
              }
            />
            <ListItemButton onClick={handleClick}>
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {s.subsections.map((sub) => {
                    return (
                      <FormControlLabel
                        label={
                          <ListItemButton>
                            <ListItemText
                              primary={`${sub.code} - ${sub.name}`}
                            />
                          </ListItemButton>
                        }
                        control={
                          <Checkbox
                            checked={checked[0]}
                            onChange={handleChange2}
                          />
                        }
                      />
                    );
                  })}
                </List>
              </Collapse>
            </Box>
          </Box>
        );
      })}
    </List>
  );
}
