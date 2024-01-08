import App from "./App"
import { ProviderWrapper  } from "contexts/mainContext"

const AppLoader = () => {
    return (
        <ProviderWrapper>
            <App />
        </ProviderWrapper>
    )
}

export default AppLoader