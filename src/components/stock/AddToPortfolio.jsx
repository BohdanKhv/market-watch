import { useState } from "react"
import { useDispatch } from "react-redux"
import { Modal, Input } from '../'
import { addToPortfolio } from "../../features/local/localSlice"

const AddToPortfolio = ({modalIsOpen, setModalIsOpen, item, setAlert}) => {
    const [quantity, setQuantity] = useState(0)
    const [price, setPrice] = useState(0)
    const dispatch = useDispatch()

    const handleAddToPortfolio = () => {
        const data = {
            symbol: item.symbol,
            quantity: quantity,
            price: price
        }
        dispatch(addToPortfolio(data));
        setModalIsOpen(false);
        setAlert(`${item.symbol} added to portfolio`);
    }

    return (
        <>
        <Modal
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            contentLabel={`${item ? item.symbol : ''}`}
            actionBtnText="Add"
            onSubmit={handleAddToPortfolio}
            actionDangerBtnText="Cancel"
            onSubmitDanger={() => {
                setModalIsOpen(false);
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
                        Price
                    </div>
                    <Input
                        type="number"
                        value={price}
                        onChange={(e) => {
                            if(e.target.value.length < 10) {
                                setPrice(e.target.value);
                            }
                        }}
                        onFocus={(e) => e.target.select()}
                        placeholder="Price"
                    />  
                </div>
            </div>
        </Modal>
        </>
    )
}

export default AddToPortfolio