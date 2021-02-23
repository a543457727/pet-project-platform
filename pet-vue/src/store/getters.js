const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    avatar: state => state.user.avatar,
    id: state => state.user.id,
    shop: state => state.user.shop,
    currentShop: state => state.user.currentShop
}
export default getters