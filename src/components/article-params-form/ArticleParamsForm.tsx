import { useState } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	//отслеживаем состояние закрыто/открыто с useState//
	const [isOpen, setIsOpen] = useState(false);
	//функция переключения  состояний//
	// const handleArrowButtonClick = () => {
	// 	setIsOpen((prevState) => !prevState);
	// };
	return (
		<>
			<ArrowButton onClick={setIsOpen} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}>
					<Text weight={800} uppercase size={31}>
						Задайте параметры
					</Text>
					<Select selected={null} options={[]} title='Шрифт'></Select>
					<RadioGroup
						name={'Размер Шрифта'}
						options={[]}
						selected={{
							title: '',
							value: '',
							className: '',
							optionClassName: undefined,
						}}
						title={'Размер шрифта'}></RadioGroup>
					<Select selected={null} options={[]} title='Цвет шрифта'></Select>
					<Separator></Separator>
					<Select selected={null} options={[]} title='Цвет фона'></Select>
					<Select selected={null} options={[]} title='Ширина контента'></Select>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
