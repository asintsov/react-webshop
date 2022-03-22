import styled from 'styled-components'

import { IoList } from 'react-icons/io5'
import { IoWalk } from 'react-icons/io5'
import { FiCloudSnow } from 'react-icons/fi'
import { FiChevronLeft } from 'react-icons/fi'
import { IoSearchSharp } from 'react-icons/io5'
import { IoFingerPrint } from 'react-icons/io5'
import { FiChevronRight } from 'react-icons/fi'
import { IoBasketOutline } from 'react-icons/io5'
import { IoHammerOutline } from 'react-icons/io5'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export const SnowfallIcon = styled(FiCloudSnow)`
  fill: none;
  color: rgb(${({ theme }) => theme.lightFont});
`
export const BasketIcon = styled(IoBasketOutline)`
  fill: none;
  color: rgb(${({ theme }) => theme.lightFont});
`
export const LoginIcon = styled(IoFingerPrint)`
  fill: rgb(${({ theme }) => theme.lightFont});
  color: rgb(${({ theme }) => theme.lightFont});
`
export const SettingsIcon = styled(IoHammerOutline)`
  fill: rgb(${({ theme }) => theme.lightFont});
  color: rgb(${({ theme }) => theme.lightFont});
`
export const RightCaruselButtonIcon = styled(FiChevronRight)`
  color: rgb(${({ theme }) => theme.lightFont});
`
export const LeftCaruselButtonIcon = styled(FiChevronLeft)`
  color: rgb(${({ theme }) => theme.lightFont});
`
export const LogoutIcon = styled(IoWalk)`
  fill: rgb(${({ theme }) => theme.lightFont});
  color: rgb(${({ theme }) => theme.lightFont});
`
export const SearchIcon = styled(IoSearchSharp)`
  fill: rgb(${({ theme }) => theme.lightFont});
  color: rgb(${({ theme }) => theme.lightFont});
`
export const CatalogueIcon = styled(IoList)`
  fill: rgb(${({ theme }) => theme.lightFont});
  color: rgb(${({ theme }) => theme.lightFont});
`
export const LoadingIcon = styled(AiOutlineLoading3Quarters)`
  fill: rgb(${({ theme }) => theme.lightFont});
  color: rgb(${({ theme }) => theme.lightFont});
`
