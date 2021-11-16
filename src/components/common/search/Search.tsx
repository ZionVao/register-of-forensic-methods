import { Grid, Paper, Stack, Box } from '@mui/material';
import * as React from 'react';
import SearchLine from './SearchLine';
import { DomainDTO } from '../../../common/dtos/domain/DomainDTO';
import { Checked, Section } from './interfaces';
import CheckBoxTree from './CheckBoxListItem';

const domains: DomainDTO[] = [
  {
    id: 1,
    name: '0.1. Комплексна експертиза',
    id_types: 1,
    typesOfMethods: {
      id: 1,
      name: '0. Комплексна експертиза',
    },
  },
  {
    id: 2,
    name: '1.1. Дослідження почерку і підписів',
    id_types: 2,
    typesOfMethods: {
      id: 2,
      name: '1. Почеркознавча і лінгвістична експертиза',
    },
  },
  {
    id: 3,
    name: '1.2. Лінгвістичне дослідження писемного мовлення',
    id_types: 2,
    typesOfMethods: {
      id: 2,
      name: '1. Почеркознавча і лінгвістична експертиза',
    },
  },
  {
    id: 4,
    name: '2.1. Дослідження реквізитів документів',
    id_types: 3,
    typesOfMethods: {
      id: 3,
      name: '2. Технічна експертиза документів',
    },
  },
  {
    id: 5,
    name: '2.2. Дослідження матеріалів документів',
    id_types: 3,
    typesOfMethods: {
      id: 3,
      name: '2. Технічна експертиза документів',
    },
  },
  {
    id: 6,
    name: '2.3. Дослідження друкарських форм та інших засобів виготовлення документів',
    id_types: 3,
    typesOfMethods: {
      id: 3,
      name: '2. Технічна експертиза документів',
    },
  },
  {
    id: 7,
    name: '3.1. Дослідження вогнепальної зброї та слідів її складових деталей',
    id_types: 4,
    typesOfMethods: {
      id: 4,
      name: '3. Експертиза зброї',
    },
  },
  {
    id: 8,
    name: '3.2. Дослідження боєприпасів слідів пострілу',
    id_types: 4,
    typesOfMethods: {
      id: 4,
      name: '3. Експертиза зброї',
    },
  },
  {
    id: 9,
    name: '3.3. Дослідження ситуаційних обставин пострілу',
    id_types: 4,
    typesOfMethods: {
      id: 4,
      name: '3. Експертиза зброї',
    },
  },
  {
    id: 10,
    name: '3.4. Дослідження ситуаційних обставин пострілу',
    id_types: 4,
    typesOfMethods: {
      id: 4,
      name: '3. Експертиза зброї',
    },
  },
  {
    id: 11,
    name: '3.5. Дослідження ситуаційних обставин пострілу',
    id_types: 4,
    typesOfMethods: {
      id: 4,
      name: '3. Експертиза зброї',
    },
  },
  {
    id: 12,
    name: '3.6. Дослідження ситуаційних обставин пострілу',
    id_types: 4,
    typesOfMethods: {
      id: 4,
      name: '3. Експертиза зброї',
    },
  },
  {
    id: 13,
    name: '4.1. Дослідження слідів людини та слідів тварини',
    id_types: 5,
    typesOfMethods: {
      id: 5,
      name: '4. Трасологічна експертиза',
    },
  },
];

const createData = (domains: DomainDTO[]): Section => {
  return domains.reduce((acc: Section, obj: DomainDTO) => {
    if (!acc[obj.id_types]) {
      acc[obj.id_types] = {
        name: obj.typesOfMethods.name,
        id_types: obj.id_types,
        domains: [],
      };
    }

    acc[obj.id_types].domains.push({
      id: obj.id,
      name: obj.name,
    });
    return acc;
  }, {});
};

type Selected = { [x: string]: Checked };

export const Search = () => {
  const [sections, setSections] = React.useState<Section>(createData(domains));

  const [selected, setSelected] = React.useState<Selected>({});

  // console.log(Object.keys(sections));
  return (
    <>
      <Paper sx={{ margin: 'auto', flexGrow: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="flex-start"
            spacing={2}
          >
            <SearchLine />

            <Stack
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              spacing={0}
            >
              {Object.keys(sections).map((value: string) => {
                const handleCheckAction = (
                  checkBoxPaiload: Checked,
                  key: number,
                ) => {
                  const newValue: Selected = { ...selected };
                  newValue[key] = checkBoxPaiload;
                  console.log(newValue);
                  setSelected(newValue);
                };
                return (
                  <CheckBoxTree
                    domains={sections[Number(value)]}
                    onSearch={handleCheckAction}
                  />
                );
              })}
            </Stack>
          </Grid>
        </Box>
      </Paper>
    </>
  );
};
