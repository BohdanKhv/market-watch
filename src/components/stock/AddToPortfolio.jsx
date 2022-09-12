import { useState } from "react"
import { useDispatch } from "react-redux"
import { Modal, Input } from '../'
import { addToPortfolio } from "../../features/local/localSlice"

const AddToPortfolio = ({open, setOpen, item, setAlert}) => {
    const [quantity, setQuantity] = useState(0)
    const [averagePrice, setAveragePrice] = useState(0)
    const dispatch = useDispatch()

    const handleAddToPortfolio = () => {
        const data = {
            quantity: quantity,
            averagePrice: averagePrice,
            ...item
        }
        dispatch(addToPortfolio(data));
        setOpen(false);
        setAlert(`${item.symbol} added to portfolio`);
    }

    return (
        <>
        <Modal
            modalIsOpen={open}
            setModalIsOpen={setOpen}
            contentLabel={`${item ? item.symbol : ''}`}
            actionBtnText="Add"
            onSubmit={averagePrice > 0 && quantity > 0 ? handleAddToPortfolio : null}
            actionDangerBtnText="Cancel"
            disableClose={averagePrice > 0 && quantity > 0 ? true : false}
            onSubmitDanger={() => {
                setOpen(false);
            }}
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

export default AddToPortfolio