import Image from 'next/image'
import Logo from '../../assets/LogoSiberia.png'

export function Header() {
    return (
        <div className='py-2 bg-white px-4 flex justify-center'>
            <Image alt='Logo da Siberia Digital' src={Logo} width={100}/>
        </div>
    )
}