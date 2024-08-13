import { useState } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	//отслеживаем состояние закрыто/открыто с useState//
	const [isOpen, setIsOpen] = useState(false);
	//функция переключения  состояний//
	const handleArrowButtonClick = () => {
		setIsOpen((prevState) => !prevState);
	};
	return (
		<>
			<ArrowButton onClick={handleArrowButtonClick} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
