import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { infoIcon, moonIcon, rightArrowIcon, sunIcon, trashIcon } from '../assets/icons'
import { Box, Modal } from '../components'
import { setTheme, resetData } from '../features/local/localSlice'

const Settings = () => {
    const theme = useSelector(state => state.local.theme);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = 'STOKIN - Settings';
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
        <Modal
            modalIsOpen={isModalOpen}
            setModalIsOpen={setIsModalOpen}
            headerNone
            onSubmit={() => {
                dispatch(resetData());
                setIsModalOpen(false);
            }}
            onSubmitDanger={() => setIsModalOpen(false)}
            actionBtnText="Reset"
            actionDangerBtnText="Cancel"
        >
            <div className="flex flex-col justify-center align-center my-5">
                <h2 className="weight-500 text-center">
                    Are you sure you want to reset your data?
                </h2>
                <h3 className="weight-500 text-center mt-3">
                    This action cannot be undone.
                </h3>
            </div>
        </Modal>

        <Box title="Settings">
            <div className="py-3">
                <div className="flex flex-col">
                    <div className="flex justify-between align-center px-4 py-3 border-bottom hover"
                        onClick={() => dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))}
                    >
                        <div className="flex align-center">
                            <i className="icon">
                                {theme === 'light' ? sunIcon : moonIcon}
                            </i>
                            <h4 className="weight-500 ms-3">
                                Theme
                            </h4>
                        </div>
                        <div className="weight-500">
                            {theme === 'light' ? 'Light' : 'Dark'}
                        </div>
                    </div>
                    <div className="flex justify-between align-center px-4 py-3 border-bottom hover"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <div className="flex align-center">
                            <i className="icon">
                                {trashIcon}
                            </i>
                            <h4 className="weight-500 ms-3">
                                Reset Data
                            </h4>
                        </div>
                        <div>
                            <div className="icon">
                                {rightArrowIcon}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between align-center px-4 py-3 border-bottom hover">
                        <div className="flex align-center">
                            <i className="icon">
                                {infoIcon}
                            </i>
                            <h4 className="weight-500 ms-3">
                                About
                            </h4>
                        </div>
                        <div>
                            <div className="icon">
                                {rightArrowIcon}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
        </>
    )
}

export default Settings