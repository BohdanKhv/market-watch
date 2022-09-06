import { useState } from "react"
import { useDispatch } from "react-redux"
import { Modal, Input } from '../'
import { updateFromPortfolio } from "../../features/local/localSlice"

const UpdatePortfolio = ({open, setOpen, item, setAlert}) => {
    const [quantity, setQuantity] = useState(item.quantity)
    const [averagePrice, setAveragePrice] = useState(item.averagePrice)
    const dispatch = useDispatch()

    const handleAddToPortfolio = () => {
        const data = {
            symbol: item.symbol,
            quantity: quantity,
            averagePrice: averagePrice,
            price: item.price,
            name: item.name,
            logo: item.logo,
        }
        dispatch(updateFromPortfolio(data));
        setOpen(false);
        setAlert(`${item.symbol} updated successfully`);
    }

    return (
        <>
        <Modal
            modalIsOpen={open}
            setModalIsOpen={setOpen}
            contentLabel={`${item ? item.symbol : ''}`}
            actionBtnText="Update"
            onSubmit={handleAddToPortfolio}
            actionDangerBtnText="Cancel"
            onSubmitDanger={() => {
                setOpen(false);
            }}
            disableClose={false}
        >
            <div className="flex flex-col gap-4">
                <div>
                    <div className="fs-16 px-3 pb-2">
                        Quantity
                    </div>
                    <Input
                        type="number"
                        value={quantity}
                        onChange={(e) => {
                            if(e.target.value.length < 10) {
                                setQuantity(e.target.value);
                            }
                        }}
                        onFocus={(e) => e.target.select()}
                        placeholder="Quantity"
                    />
                </div>
                <div>
                    <div className="fs-16 px-3 pb-2">
                        Average Price (per share)
                    </div>
                    <Input
                        type="number"
                        value={averagePrice}
                        onChange={(e) => {
                            if(e.target.value.length < 10) {
                                setAveragePrice(e.target.value);
                            }
                        }}
                        onFocus={(e) => e.target.select()}
                        placeholder="Average Price"
                    />  
                </div>
            </div>
        </Modal>
        </>
    )
}

export default UpdatePortfolio