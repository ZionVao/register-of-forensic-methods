import { Grid, Paper, Stack, Box } from '@mui/material';
import * as React from 'react';
import SearchLine from './SearchLine';
import { Checked, Section } from './interfaces';
import CheckBoxTree from './CheckBoxListItem';
import { TypeDTO } from '../../../common/dtos/type/TypeDTO';
import { loadTypes } from '../../../store/type/slice';
import { useTypedDispatch, useTypedSelector } from '../../../store/store';
import { fetchTypesData } from '../../../store/type/actions';
import { MethodFilter } from '../../../services/interfaces/interfaces';
import { check } from 'prettier';

const createData = (types: TypeDTO[]): Section => {
  return types.reduce((acc: Section, obj: TypeDTO) => {
    acc[obj.id] = {
      name: obj.name,
      id_types: obj.id,
      domains: [...obj.domains],
    };
    return acc;
  }, {});
};

type Selected = { [x: string]: Checked };

export const Search = (props: {
  onSearch: (name: string, ids: string) => void;
}) => {
  const types = useTypedSelector(loadTypes);
  const sections = createData(types.types);

  const dispatch = useTypedDispatch();

  React.useEffect(() => {
    dispatch(fetchTypesData());
  }, [dispatch]);

  const [selected, setSelected] = React.useState<Selected>({});

  const handleSearch = React.useCallback((name: string) => {
    const ids: string[] = [];
    Object.values(selected).forEach((el: Checked) => {
      Object.keys(el).forEach((id: string) => {
        console.log(id);

        if (el[id].status === true) ids.push(id);
      });
    });
    console.log(ids.join(','), 'suka');

    return props.onSearch(name, ids.join(','));
  }, []);

  return (
    <>
      <Paper sx={{ margin: 'auto', flexGrow: 1, width: '100%' }}>
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="flex-start"
            spacing={2}
          >
            <SearchLine onSubmit={handleSearch} />

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
