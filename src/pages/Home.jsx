import { trashIcon, shareIcon } from '../assets/icons'
import testStock from '../assets/testStock.json'
import { Box, ListItem } from '../components'

const listMenuItems = [
  {
    title: "Delete",
    icon: trashIcon
  },
  {
    title: "Share",
    icon: shareIcon
  }
]

const Home = () => {
  return (
    <div className="content-body">
        <Box title="Stock Watchlist" menuItems={listMenuItems}>
          <div className="flex flex-col">
            {testStock.map((item, index) => (
              <ListItem key={index} item={item} />
            ))}
          </div>
        </Box>
    </div>
  )
}

export default Home