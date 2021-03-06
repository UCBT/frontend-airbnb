import React, { useState, useCallback, useLayoutEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { isBefore } from 'date-fns';

import { Container, Search, Form } from './styles';

import Input from '../Input';
import Calendar from '../Calendar';
import Guest from '../Guest';

const Header: React.FC = () => {
  const [toggleSearchMenu, setToggleSearchMenu] = useState<boolean>(false);

  const [checkinDate, setCheckinDate] = useState<Date | null>(null);
  const [openCheckinDate, setOpenCheckinDate] = useState<boolean>(false);
  const [checkoutDate, setCheckoutDate] = useState<Date | null>(null);
  const [openCheckoutDate, setOpenCheckoutDate] = useState<boolean>(false);

  const [guest, setGuest] = useState<boolean>(false);

  const [guestCount, setGuestCount] = useState(0);

  const [adultCount, setAdultCount] = useState(0);
  const [kidCount, setKidCount] = useState(0);
  const [babyCount, setBabyCount] = useState(0);

  const toggleSearchMenuVisibility = useCallback(() => {
    setToggleSearchMenu(!toggleSearchMenu);
  }, [toggleSearchMenu]);

  const toggleCheckinDate = useCallback((date) => {
    setCheckinDate(date);
  }, []);

  const toggleCheckoutDate = useCallback((date) => {
    setCheckoutDate(date);
  }, []);

  useLayoutEffect(() => {
    if (checkinDate && checkoutDate) {
      const validateCheckout = isBefore(checkoutDate, checkinDate)
        ? null
        : checkoutDate;
      setCheckoutDate(validateCheckout);
    }
  }, [checkinDate, checkoutDate, openCheckoutDate]);

  return (
    <Container>
      <Search>
        <button
          type="button"
          className="form-input"
          onClick={toggleSearchMenuVisibility}
        >
          <input
            type="text"
            id="search"
            autoComplete="off"
            placeholder="Comece sua busca"
            readOnly
          />
          <div>
            <AiOutlineSearch color="#FFF" size={20} />
          </div>
        </button>

        <Form searchMenu={toggleSearchMenu} autoComplete="off">
          <Input>
            <label htmlFor="localization">
              LOCALIZAÇÃO
              <input
                type="text"
                id="localization"
                placeholder="Para onde você vai ?"
              />
            </label>
          </Input>

          <Input>
            <label htmlFor="checkin">
              CHECK-IN
              <Calendar
                id="checkin"
                selected={checkinDate}
                onChange={(date: Date) => toggleCheckinDate(date)}
                placeholderText="Insira a data"
                minDate={new Date()}
                open={openCheckinDate}
                onInputClick={() => setOpenCheckinDate(true)}
                onClickOutside={() => setOpenCheckinDate(false)}
              />
            </label>
          </Input>

          <Input>
            <label htmlFor="checkout">
              CHECKOUT
              <Calendar
                id="checkout"
                selected={checkoutDate}
                onChange={(date: Date) => toggleCheckoutDate(date)}
                placeholderText="Insira a data"
                minDate={checkinDate || new Date()}
                open={openCheckoutDate}
                onInputClick={() => setOpenCheckoutDate(true)}
                onClickOutside={() => setOpenCheckoutDate(false)}
              />
            </label>
          </Input>

          <Input>
            <label htmlFor="guests">
              HOSPÉDES
              <input
                type="text"
                id="guests"
                placeholder="Insira o numéro de hospedes"
                onFocus={() => setGuest(true)}
                onClick={() => setGuest(true)}
              />
              <Guest
                guest={guest}
                setGuest={setGuest}
                guestCount={guestCount}
                setGuestCount={setGuestCount}
                adultCount={adultCount}
                setAdultCount={setAdultCount}
                kidCount={kidCount}
                setKidCount={setKidCount}
                babyCount={babyCount}
                setBabyCount={setBabyCount}
              />
            </label>
          </Input>

          <div className="form-input">
            <button type="submit">
              <AiOutlineSearch color="#FFF" size={20} />
              <span>BUSCAR</span>
            </button>
          </div>
        </Form>
      </Search>
    </Container>
  );
};

export default Header;
