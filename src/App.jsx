import { useState } from 'react';
import {
  Container,
  Typography,
  FormControl,
  Box,
  InputLabel,
  Select,
  FormHelperText,
  MenuItem,
  TextField,
  Stack,
  Button,
  IconButton,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

function App() {
  const [libur, setLibur] = useState(null);
  const [shift, setShift] = useState(null);

  const optDays = [
    { value: '1', label: 'Senin' },
    { value: '2', label: 'Selasa' },
    { value: '3', label: 'Rabu' },
    { value: '4', label: 'Kamis' },
    { value: '5', label: 'Jumat' },
    { value: '6', label: 'Sabtu' },
    { value: '7', label: 'Minggu' },
  ];

  const [dataKaryawan, setDataKaryawan] = useState([
    {
      name: '',
      reqLibur: '',
    },
  ]);

    console.log(dataKaryawan);

  const handleChangeLibur = (e) => {
     const arrLibur = new Array(e.target.value).fill(null); 
    setLibur(e.target.value);
    console.log(arrLibur);
    let obj = {
      name: '',
    };
    for (let i = 0; i < e.target.value; i++) {
      const key = `reqLibur${i + 1}`;
      obj[key] = '';
    }
    setDataKaryawan([obj]);
  };
  const handleChangeShift = (e) => {
    setShift(e.target.value);
  };

  const handleAddKaryawan = () => {
    const obj = {
      name: '',
      reqLibur: '',
    };

    const newDatakaryawan = [...dataKaryawan, obj];
    setDataKaryawan(newDatakaryawan);
  };

  const handleRemoveKaryawan = (indexToDelete) => {
    const newDatakaryawan = dataKaryawan.filter(
      (_, index) => index !== indexToDelete
    );
    setDataKaryawan(newDatakaryawan);
  };

  const handleChangeNama = (e, indexItem) => {
    const val = e.target.value;

    setDataKaryawan((prev) =>
      prev.map((item, index) =>
        index === indexItem ? { ...item, name: val } : item
      )
    );
  };

  const handleChangeHariLibur = (e, indexItem) => {
    const val = e.target.value;
    setDataKaryawan((prev) =>
      prev.map((item, index) =>
        index === indexItem ? { ...item, reqLibur: val } : item
      )
    );
  };

  const handleSave = () => {
    console.log(dataKaryawan);
    dataKaryawan.forEach((data) =>
      data.reqLibur
        ? console.log('libur', data.reqLibur)
        : console.log('no req')
    );
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h1" fontSize={26} fontWeight={600}>
        Sistem Penjadwalan
      </Typography>
      <Box sx={{ paddingTop: '20px' }}>
        <FormControl sx={{ m: 1, minWidth: 220 }}>
          <InputLabel id="demo-simple-select-helper-label">Libur</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={libur}
            label="Libur"
            onChange={handleChangeLibur}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
          <FormHelperText>
            Silahkan pilih jumlah libur (dalam hari)
          </FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 220 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Jumlah shift
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={shift}
            label="Jumlah shift"
            onChange={handleChangeShift}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
          <FormHelperText>Silahkan pilih jumlah Shift</FormHelperText>
        </FormControl>
        {libur && shift && (
          <Box>
            <Typography>
              Ada {libur} hari libur dan {shift} shift jam kerja
            </Typography>
            {dataKaryawan.map((data, index) => (
              <Stack
                direction="row"
                spacing={3}
                key={index}
                sx={{ marginY: '10px' }}
              >
                <TextField
                  value={data.nama}
                  label="Nama karyawan"
                  onChange={(e) => handleChangeNama(e, index)}
                >
                  Nama
                </TextField>
                <FormControl sx={{ m: 1, minWidth: 220 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Hari libur
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={dataKaryawan.reqLibur}
                    label="Hari libur"
                    onChange={(e) => handleChangeHariLibur(e, index)}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {optDays.map((opt, index) => (
                      <MenuItem value={opt.value} key={index}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Silahkan pilih hari libur</FormHelperText>
                </FormControl>
                {dataKaryawan.length > 1 && (
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveKaryawan(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Stack>
            ))}
            <Stack spacing={3}>
              <Button
                variant="outlined"
                startIcon={<PersonAddIcon />}
                onClick={handleAddKaryawan}
              >
                Tambah karyawan
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
              >
                Save jadwal
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default App;
