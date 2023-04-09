import { NavLink } from 'react-router-dom'

export default function NavBar() {

    const activeStyle = ({ isActive }: { isActive: boolean }) => {
        if(isActive) return {
            fontWeight: 'bold'
        }
        return {
            fontWeight: 'normal'
        }
    }
    
    return <div className = 'flex items-center gap-5 text-gray-800 pl-3 shadow-gray-300 shadow-sm bg-yellow-300 py-4'>
        <NavLink style = {activeStyle} to = '/'>Home</NavLink>
        <NavLink style = {activeStyle} to = '/super-heroes'>Traditional Super Heroes</NavLink>
        <NavLink style = {activeStyle} to = '/rq-super-heroes'>RQ Super Heroes</NavLink>
    </div>
}