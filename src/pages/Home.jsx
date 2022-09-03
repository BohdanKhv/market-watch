import testStock from '../assets/testStock.json'
import { Box, ListItem } from '../components'

const Home = () => {
  return (
    <div className="content-body">
        <Box title="Stock Watchlist">
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