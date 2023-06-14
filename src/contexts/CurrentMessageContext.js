import { createContext, useContext, useState } from "react";

export const currentMessageContext = createContext();
export const setCurrentMessageContext = createContext();

export const useCurrentMessage = () => useContext(currentMessageContext);
export const useSetCurrentMessage = () => useContext(setCurrentMessageContext);

export const CurrentMessageProvider = ({ children }) => {
	const [currentMessage, setCurrentMessage] = useState({
		"variant": "",
		"message": "",
		"flag": false
	});

	return (
		<currentMessageContext.Provider value={currentMessage}>
			<setCurrentMessageContext.Provider value={setCurrentMessage}>
				{children}
			</setCurrentMessageContext.Provider>
		</currentMessageContext.Provider>
	);
};
