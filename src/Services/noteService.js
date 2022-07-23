import axios from "axios";
const url = "http://localhost:3000/";
const fetchNote = async () => {
  var res = await axios.get(url);
  if (res.status == 200) {
    return res.body;
  } else {
    return false;
  }
};

export default NoteService;
