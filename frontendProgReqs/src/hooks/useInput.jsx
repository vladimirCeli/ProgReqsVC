import useLocalStorage from './useLocalStorage'

const useInput = (key, initValue) => {
    const [value, setValue] = useLocalStorage(key, initValue);

    const handleChange = {
        onChange: (e) => setValue({ ...value, [e.target.name]: e.target.value }),
    }

    return [value, handleChange]
}

export default useInput