import { useState } from "react"
import { Modal, Input } from '../'

const AddToPortfolio = ({modalIsOpen, setModalIsOpen, item}) => {
    const [quantity, setQuantity] = useState(0)
    const [price, setPrice] = useState(0)

    return (
        <Modal
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            contentLabel={`${item ? item.symbol : ''}`}
            actionBtnText="Add"
            onSubmit={() => console.log('submit')}
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
                        placeholder="Price"
                    />  
                </div>
            </div>
        </Modal>
    )
}

export default AddToPortfolio