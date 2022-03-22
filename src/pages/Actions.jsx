import React from 'react'

import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { routes } from '../config'
import { setSearchString } from '../redux/actions'
import { putToLocalStorage } from '../components/atoms'

const ActionsWrapper = styled.div`
  margin: 10px 0;
`
const ActionBox = styled.div`
  margin: 20px;
  padding: 20px;
  border: 2px solid rgb(${({ theme }) => theme.lightFont});
  color: rgb(${({ theme }) => theme.darkFont});
  font-size: 20px;
  white-space: normal;
  text-align: justify;
  @media (max-width: 360px) {
    font-size: 14px;
  }
  span {
    text-decoration: underline;
    cursor: pointer;
  }
`

export const Actions = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  function handleClick(searchString = '', route, category = '', type = '') {
    if (searchString) {
      dispatch(setSearchString(searchString))
    } else {
      putToLocalStorage('itemCategory', category)
      putToLocalStorage('itemType', type)
    }
    history.push(route)
  }

  return (
    <ActionsWrapper>
      <ActionBox>
        Судя по приметам погоды, 2021 год станет весьма урожайным на{' '}
        <span
          onClick={() => handleClick('белый', routes.search)}
        >
          БЕЛЫЙ ГРИБ
        </span>
        . Обратите внимание, что в этом году на него неплохая скидка в 10% при покупке от 2 кг!
      </ActionBox>
      <ActionBox>
        В мире есть не так уж и много людей, по заслугам оценивших пользу целебных свойств настойки
        на мухоморах. Совместно с клюквенными и брусничными заготовками, зимой Вашему здоровью
        ничего не угрожает. Спеши купить{' '}
        <span
          onClick={() => handleClick('', routes.catalogue, 'Ягоды', 'Болотные')}
        >
          БОЛОТНЫХ ЯГОД
        </span>{' '}
        на 2000 рублей и получи 500 грамм МУХОМОРОВ бесплатно!
      </ActionBox>
      <ActionBox>
        Мы не по наслышке знаем, как студенты любят картошечку с жаренными грибами. И, конечно,
        ОПЯТА - самые главные `картошечные` грибы. Предъяви при покупке студенческий билет и получи
        скидку на{' '}
        <span
          onClick={() => handleClick('опята', routes.search)}
        >
          ОПЯТА
        </span>{' '}
        20%. Мы всегда поддерживаем студентов!
      </ActionBox>
      <ActionBox>
        Кстати о сессии! Ученые давно доказали, что при мыслительном процессе организм расходуем
        огромное количество углеводов. Нет более полезного и универсального источника углеводов, как
        глюкоза из нашего мёда. 100% эколигечсик чистый продукт снабдит тебя энергией на всё время
        сессии. А главное совершенно БЕСПЛАТНО! Ведь здоровые и счастливые студенты покупают больше
        грибов и ягод! Приходи получить бесплатные 100 грамм{' '}
        <span
          onClick={() => handleClick('', routes.catalogue, 'Мёд', '')}
        >
          ЛЮБОГО МЁДА
        </span>{' '}
        уже сегодня!
      </ActionBox>
      <ActionBox>
        Витамины особенно нужны в зимние и весенние месяцы, когда организм истощен и требует срочной
        компенсации необходимых веществ и элементов. Чтобы Вам было легче перенести нехватку
        витаминов предстоящей зимой задумайтесь о заготовках уже сейчас. Кстати, у нас как раз при
        покупке{' '}
        <span
          onClick={() => handleClick('клюква', routes.search)}
        >
          КЛЮКВЫ
        </span>{' '}
        любого количества, 100 грамм СМОРОДИНЫ за каждый килограмм КЛЮКВЫ - в подарок!
      </ActionBox>
      <ActionBox>
        В холодные зимние вечера хочется посидеть, завернувшись тёплым пледом с чашкой горячего
        напитка. Лучшим дополнением может быть только ложка сладкого МЁДА. Горчичный, липовый,
        цветочный! Объеденье! К тому же зимой на{' '}
        <span
          onClick={() => handleClick('', routes.catalogue, 'Мёд', '')}
        >
          МЁД
        </span>{' '}
        скидка 5%!
      </ActionBox>
    </ActionsWrapper>
  )
}
