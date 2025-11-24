import AddTaskIcon from '@mui/icons-material/AddTask';

function Header() {
  return (
    <header>
      <div>
        <AddTaskIcon sx={{ color: " ", fontSize: 80}}/>
      </div>
      <h1>Checkly</h1>
    </header>
  );
}

export default Header;
