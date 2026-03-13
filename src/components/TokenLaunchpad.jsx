export const TokenLaunchpad = () => {
    return (
        <>
            <div className="h-screen py-20 w-max-7xl flex flex-col justify-center items-center bg-zinc-800">
                <h1 className="text-4xl font-semibold text-white">Solana Token Launchpad</h1> <br />
                <input className="inputText placeholder:text-white text-white border px-10 py-2 rounded-xl" type="text" placeholder="Name"></input> <br />
                <input className="inputText placeholder:text-white text-white border px-10 py-2 rounded-xl" type="text" placeholder="Symbol"></input> <br />
                <input className="inputText placeholder:text-white text-white border px-10 py-2 rounded-xl" type="text" placeholder="Image URL"></input> <br />
                <input className="inputText placeholder:text-white text-white border px-10 py-2 rounded-xl" type="text" placeholder="Initial Supply"></input> <br />
                <button className="btn border placeholder:text-white text-white px-5 py-2 cursor-pointer rounded-xl bg-violet-500">Create a Token</button>
            </div >
        </>
    )
}