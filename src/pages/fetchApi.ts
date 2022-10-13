import axios from "axios";
    
async function fetchPosts() {
    const { data } = await axios.get('https://www.ag-grid.com/example-assets/row-data.json')
    return data
}
    
export default fetchPosts;