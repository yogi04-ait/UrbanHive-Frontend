import { useDispatch, useSelector } from "react-redux"


const Wishlist = () => {
    const wishlist = useSelector(store=>store.wishlist)

  return (
    <div>
      <h1 className="text-2xl p-5">Your Wishlist</h1>
      <div className="flex flex-wrap">
        <div>
          <img />
        </div>
      </div>
    </div>
  )
}

export default Wishlist