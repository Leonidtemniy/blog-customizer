import { useRef, useState } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

type ArticleParamProps = {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamProps) => {
	//отслеживаем состояние закрыто/открыто с Хуком useState//
	const [isOpen, setIsOpen] = useState(false);
	//отслеживаем изменение настроек статьи с хуком useState//
	const [selectArticleState, setSelectArticleState] =
		useState<ArticleStateType>(currentArticleState);
	//создаем реф для Aside для отслеживания клика вне элемента
	const formRef = useRef<HTMLDivElement>(null);
	const toggleSidebar = (newState: boolean) => {
		setIsOpen(newState);
	};
	//используем кастомный хук
	useOutsideClickClose({
		isOpen,
		onChange: setIsOpen,
		onClose: () => setIsOpen(false),
		rootRef: formRef,
	});

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setSelectArticleState({ ...selectArticleState, [key]: value });
	};

	return (
		<>
			<ArrowButton onClick={toggleSidebar} isOpen={isOpen} />
			<aside
				ref={formRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						setCurrentArticleState(selectArticleState); //передаем изменения в статью
						toggleSidebar(false); //закрываем сайдбар
					}}
					onReset={() => {
						setSelectArticleState(defaultArticleState); // Сбрасываем состояние формы
						setCurrentArticleState(defaultArticleState); // Сбрасываем состояние статьи
						toggleSidebar(false); //закрываем сайдбар
					}}>
					<Text weight={800} uppercase size={31}>
						Задайте параметры
					</Text>
					<Select
						selected={selectArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(value: OptionType) =>
							handleChange('fontFamilyOption', value)
						}
					/>

					<RadioGroup
						name={'Размер Шрифта'}
						options={fontSizeOptions}
						selected={selectArticleState.fontSizeOption}
						title={'Размер шрифта'}
						onChange={(value: OptionType) =>
							handleChange('fontSizeOption', value)
						}
					/>
					<Select
						selected={selectArticleState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(value) => handleChange('fontColor', value)}
					/>
					<Separator></Separator>
					<Select
						selected={selectArticleState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(value) => handleChange('backgroundColor', value)}
					/>
					<Select
						selected={selectArticleState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(value) => handleChange('contentWidth', value)}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
