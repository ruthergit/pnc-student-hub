import MarketPost from "../../features/marketplace/components/MarketPost"
import MaterialPost from "../../features/Materials/components/MaterialPost"
import RequestPost from "../../features/requests/components/RequestPost"

const UnifiedFeed = () => {
  return (
    <div className="space-y-4 pt-12 pb-30 h-dvh overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <MarketPost/>
      <MaterialPost/>
      <RequestPost/>
    </div>
  )
}

export default UnifiedFeed