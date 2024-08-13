import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

interface ArrowButtonProps {
	onClick: (data: boolean) => void;
	isOpen: boolean;
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({
	onClick,
	isOpen,
}) => {
	//функция открывания по нажатию на  enter;//
	const handleEnterKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			onClick(!isOpen);
		}
	};
	return (
		<div
			role='button'
			aria-label={
				isOpen
					? 'Открыть форму параметров статьи'
					: 'Закрыть форму параметров статьи'
			}
			tabIndex={0}
			onClick={() => onClick(!isOpen)}
			onKeyDown={handleEnterKeyDown}
			className={clsx(styles.container, { [styles.container_open]: isOpen })}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
			/>
		</div>
	);
};
