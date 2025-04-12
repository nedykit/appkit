'use client'

import { mainnet } from '@nedykit/appkit/networks'
import { useAppKit, useAppKitNetwork, useAppKitTheme, useDisconnect } from '@nedykit/appkit/react'

export function ActionButtonList() {
  const modal = useAppKit()
  const { disconnect } = useDisconnect()
  const { switchNetwork } = useAppKitNetwork()
  const { themeMode, setThemeMode } = useAppKitTheme()

  function openAppKit() {
    modal.open()
  }

  function switchToNetwork() {
    switchNetwork(mainnet)
  }

  async function handleDisconnect() {
    try {
      await disconnect()
    } catch (error) {
      console.error('Error during disconnect:', error)
    }
  }

  function toggleTheme() {
    const newTheme = themeMode === 'dark' ? 'light' : 'dark'
    setThemeMode(newTheme)
    document.documentElement.className = newTheme
  }

  return (
    <div className="action-button-list">
      <button onClick={openAppKit}>Open</button>
      <button onClick={handleDisconnect}>Disconnect</button>
      <button onClick={switchToNetwork}>Switch to Ethereum</button>
      <button onClick={toggleTheme}>
        {themeMode === 'light' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M15 5V2C15 1.73478 15.1054 1.48043 15.2929 1.29289C15.4804 1.10536 15.7348 1 16 1C16.2652 1 16.5196 1.10536 16.7071 1.29289C16.8946 1.48043 17 1.73478 17 2V5C17 5.26522 16.8946 5.51957 16.7071 5.70711C16.5196 5.89464 16.2652 6 16 6C15.7348 6 15.4804 5.89464 15.2929 5.70711C15.1054 5.51957 15 5.26522 15 5ZM24 16C24 17.5823 23.5308 19.129 22.6518 20.4446C21.7727 21.7602 20.5233 22.7855 19.0615 23.391C17.5997 23.9965 15.9911 24.155 14.4393 23.8463C12.8874 23.5376 11.462 22.7757 10.3431 21.6569C9.22433 20.538 8.4624 19.1126 8.15372 17.5607C7.84504 16.0089 8.00346 14.4003 8.60896 12.9385C9.21447 11.4767 10.2398 10.2273 11.5554 9.34824C12.871 8.46919 14.4177 8 16 8C18.121 8.00232 20.1545 8.84591 21.6543 10.3457C23.1541 11.8455 23.9977 13.879 24 16ZM22 16C22 14.8133 21.6481 13.6533 20.9888 12.6666C20.3295 11.6799 19.3925 10.9108 18.2961 10.4567C17.1997 10.0026 15.9933 9.88378 14.8295 10.1153C13.6656 10.3468 12.5965 10.9182 11.7574 11.7574C10.9182 12.5965 10.3468 13.6656 10.1153 14.8295C9.88378 15.9933 10.0026 17.1997 10.4567 18.2961C10.9108 19.3925 11.6799 20.3295 12.6666 20.9888C13.6533 21.6481 14.8133 22 16 22C17.5908 21.9983 19.116 21.3657 20.2408 20.2408C21.3657 19.116 21.9983 17.5908 22 16ZM7.2925 8.7075C7.48014 8.89514 7.73464 9.00056 8 9.00056C8.26536 9.00056 8.51986 8.89514 8.7075 8.7075C8.89514 8.51986 9.00056 8.26536 9.00056 8C9.00056 7.73464 8.89514 7.48014 8.7075 7.2925L6.7075 5.2925C6.51986 5.10486 6.26536 4.99944 6 4.99944C5.73464 4.99944 5.48014 5.10486 5.2925 5.2925C5.10486 5.48014 4.99944 5.73464 4.99944 6C4.99944 6.26536 5.10486 6.51986 5.2925 6.7075L7.2925 8.7075ZM7.2925 23.2925L5.2925 25.2925C5.10486 25.4801 4.99944 25.7346 4.99944 26C4.99944 26.2654 5.10486 26.5199 5.2925 26.7075C5.48014 26.8951 5.73464 27.0006 6 27.0006C6.26536 27.0006 6.51986 26.8951 6.7075 26.7075L8.7075 24.7075C8.80041 24.6146 8.87411 24.5043 8.92439 24.3829C8.97468 24.2615 9.00056 24.1314 9.00056 24C9.00056 23.8686 8.97468 23.7385 8.92439 23.6171C8.87411 23.4957 8.80041 23.3854 8.7075 23.2925C8.61459 23.1996 8.50429 23.1259 8.3829 23.0756C8.2615 23.0253 8.13139 22.9994 8 22.9994C7.86861 22.9994 7.7385 23.0253 7.6171 23.0756C7.49571 23.1259 7.38541 23.1996 7.2925 23.2925ZM24 9C24.1314 9.0001 24.2615 8.97432 24.3829 8.92414C24.5042 8.87395 24.6146 8.80033 24.7075 8.7075L26.7075 6.7075C26.8951 6.51986 27.0006 6.26536 27.0006 6C27.0006 5.73464 26.8951 5.48014 26.7075 5.2925C26.5199 5.10486 26.2654 4.99944 26 4.99944C25.7346 4.99944 25.4801 5.10486 25.2925 5.2925L23.2925 7.2925C23.1525 7.43236 23.0571 7.61061 23.0185 7.80469C22.9798 7.99878 22.9996 8.19997 23.0754 8.38279C23.1511 8.56561 23.2794 8.72185 23.444 8.83172C23.6086 8.94159 23.8021 9.00016 24 9ZM24.7075 23.2925C24.5199 23.1049 24.2654 22.9994 24 22.9994C23.7346 22.9994 23.4801 23.1049 23.2925 23.2925C23.1049 23.4801 22.9994 23.7346 22.9994 24C22.9994 24.2654 23.1049 24.5199 23.2925 24.7075L25.2925 26.7075C25.3854 26.8004 25.4957 26.8741 25.6171 26.9244C25.7385 26.9747 25.8686 27.0006 26 27.0006C26.1314 27.0006 26.2615 26.9747 26.3829 26.9244C26.5043 26.8741 26.6146 26.8004 26.7075 26.7075C26.8004 26.6146 26.8741 26.5043 26.9244 26.3829C26.9747 26.2615 27.0006 26.1314 27.0006 26C27.0006 25.8686 26.9747 25.7385 26.9244 25.6171C26.8741 25.4957 26.8004 25.3854 26.7075 25.2925L24.7075 23.2925ZM6 16C6 15.7348 5.89464 15.4804 5.70711 15.2929C5.51957 15.1054 5.26522 15 5 15H2C1.73478 15 1.48043 15.1054 1.29289 15.2929C1.10536 15.4804 1 15.7348 1 16C1 16.2652 1.10536 16.5196 1.29289 16.7071C1.48043 16.8946 1.73478 17 2 17H5C5.26522 17 5.51957 16.8946 5.70711 16.7071C5.89464 16.5196 6 16.2652 6 16ZM16 26C15.7348 26 15.4804 26.1054 15.2929 26.2929C15.1054 26.4804 15 26.7348 15 27V30C15 30.2652 15.1054 30.5196 15.2929 30.7071C15.4804 30.8946 15.7348 31 16 31C16.2652 31 16.5196 30.8946 16.7071 30.7071C16.8946 30.5196 17 30.2652 17 30V27C17 26.7348 16.8946 26.4804 16.7071 26.2929C16.5196 26.1054 16.2652 26 16 26ZM30 15H27C26.7348 15 26.4804 15.1054 26.2929 15.2929C26.1054 15.4804 26 15.7348 26 16C26 16.2652 26.1054 16.5196 26.2929 16.7071C26.4804 16.8946 26.7348 17 27 17H30C30.2652 17 30.5196 16.8946 30.7071 16.7071C30.8946 16.5196 31 16.2652 31 16C31 15.7348 30.8946 15.4804 30.7071 15.2929C30.5196 15.1054 30.2652 15 30 15Z"
              fill="currentColor"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M29.1925 17.7788C29.0642 17.6503 28.9034 17.5591 28.7272 17.515C28.551 17.471 28.3662 17.4757 28.1925 17.5288C26.2857 18.1053 24.2583 18.1536 22.3262 17.6686C20.3941 17.1837 18.6298 16.1837 17.2212 14.7751C15.8126 13.3665 14.8126 11.6022 14.3277 9.67013C13.8427 7.73804 13.8911 5.71059 14.4675 3.8038C14.521 3.63006 14.5261 3.44501 14.4823 3.26857C14.4385 3.09213 14.3475 2.93097 14.2189 2.80241C14.0904 2.67386 13.9292 2.58279 13.7528 2.53898C13.5763 2.49518 13.3913 2.5003 13.2175 2.5538C10.5813 3.36136 8.26695 4.97979 6.60378 7.1788C5.14929 9.10987 4.26209 11.4083 4.04186 13.8158C3.82162 16.2233 4.27707 18.6445 5.35704 20.8074C6.437 22.9703 8.0987 24.7893 10.1554 26.0598C12.2122 27.3304 14.5825 28.0023 17 28.0001C19.8205 28.0087 22.5658 27.0919 24.815 25.3901C27.014 23.7269 28.6325 21.4125 29.44 18.7763C29.4929 18.6032 29.4978 18.419 29.4542 18.2433C29.4106 18.0677 29.3202 17.9071 29.1925 17.7788ZM23.6125 23.7926C21.4945 25.3879 18.8714 26.1644 16.2262 25.9792C13.581 25.794 11.0918 24.6595 9.2167 22.7845C7.34162 20.9096 6.20692 18.4205 6.02149 15.7753C5.83606 13.1301 6.61237 10.507 8.20753 8.3888C9.24678 7.01638 10.5904 5.90386 12.1325 5.1388C12.0447 5.75533 12.0004 6.37729 12 7.00005C12.0037 10.4467 13.3745 13.7512 15.8117 16.1884C18.2488 18.6256 21.5533 19.9964 25 20.0001C25.624 19.9999 26.2473 19.9556 26.865 19.8676C26.0993 21.41 24.9859 22.7536 23.6125 23.7926Z"
              fill="currentColor"
            />
          </svg>
        )}
      </button>
    </div>
  )
}
