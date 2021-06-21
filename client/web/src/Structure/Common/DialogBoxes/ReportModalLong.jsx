import React, { useRef, useState } from 'react';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';
import { resultAction, modalStyles } from '../../Results Display';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core';
import report from '../../../Assets/report.svg';
import styles from '../../Practice/Styles/LongType.module.css';
import CloseIcon from '@material-ui/icons/Close';
import { IssueReport, Line, Tag, TagsWrapper, CustomizedTextArea, CustomButton } from '../Styles/ReportDialogLong';
import ReasonEnums from '../../../Enums/ReasonEnums';
import { useSelector } from 'react-redux';
import { CustomizedSnackbars } from '../AlertPopUps/CustomizedSnackbars';
import { ReportSuccessModal } from './ReportSuccessModal';
const useStyles = makeStyles((theme) => ({
	backDrop: {
		backdropFilter: 'blur(10px)',
		backgroundColor: 'rgba(0,0,30,0.4)'
	}
}));
function ReportDialogLong ({ question_id, customMargin, statement }) {
	const classes = modalStyles();
	const classesNew = useStyles();
	const [
		open,
		setOpen
	] = useState(false);
	const [
		select,
		setSelect
	] = useState([]);
	const [
		details,
		setDetails
	] = useState('');
	const [
		success,
		setSuccess
	] = useState(false);
	const snackbarBtnRef = useRef();
	const errorMessage = useSelector((state) => state.resultReducer.errorMessage);
	let issues = Object.values(ReasonEnums);

	const dispatch = useDispatch();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = async (submit) => {
		if (submit) {
			if (details.length === 0 || select.length === 0) {
				return;
			}
			let res = await handleReport();
			if (res.output) {
				setSuccess(true);
			} else {
				setSuccess(false);
			}
			snackbarBtnRef.current.click();
		}
		setOpen(false);
		setSelect([]);
		setDetails('');
	};

	const handleDetailsChange = (e) => {
		setDetails(e.target.value);
	};

	const toggleSelect = (index) => {
		setSelect((prev) => {
			if (prev.includes(index)) {
				return prev.filter((el) => el !== index);
			}
			if (prev.length === 2) {
				return prev;
			}
			return [
				...prev,
				index
			];
		});
	};
	const handleReport = () => {
		let reasons = select.map((ind) => issues[ind]);
		const payload = {
			question_id,
			reason: reasons,
			des: details
		};
		return dispatch(resultAction.sendReport(payload));
	};

	return (
		<div>
			{/* <IssueReport onClick={handleClickOpen} margin={customMargin}>
        Report an issue with the question
          </IssueReport> */}
			<div
				onClick={handleClickOpen}
				style={{
					display: 'flex',
					alignItems: 'center',
					marginTop: 20,
					cursor: 'pointer'
				}}
			>
				<img src={report} alt="report" />
				{statement !== -1 && <div className={styles.report}>Report an issue</div>}
			</div>
			<Dialog
				BackdropProps={{
					classes: {
						root: classesNew.backDrop
					}
				}}
				className={classes.modalWidth}
				open={open}
				onClose={() => handleClose(false)}
				maxWidth={'lg'}
				aria-labelledby="responsive-dialog-title"
			>
				<div className={classes.title} id="responsive-dialog-title">
					{'Report an issue with the question'}{' '}
					<span style={{ float: 'right', cursor: 'pointer' }}>
						<CloseIcon onClick={() => handleClose(false)} />
					</span>
				</div>
				<Line />
				<DialogContent>
					<div>
						<h5 className={classes.issue}>What seems to be the issue with the question? * </h5>
						<TagsWrapper>
							{issues.map((el, i) => (
								<Tag onClick={() => toggleSelect(i)} selected={select.includes(i)} key={i}>
									{el}
								</Tag>
							))}
						</TagsWrapper>
					</div>
					<div>
						<h3 className={classes.details}>Add Details *</h3>
						<CustomizedTextArea onChange={handleDetailsChange} value={details} />
					</div>
				</DialogContent>
				<DialogActions>
					<CustomButton
						className={classes.submitBtn}
						onClick={() => handleClose(true, 'here')}
						color="primary"
						autoFocus
						submitBtn={true}
						disabled={details.length === 0 || select.length === 0}
					>
						Submit
					</CustomButton>
					{/* <button
            className={classes.submitBtn}
            autoFocus
            submitBtn={true}
            disabled={details.length === 0 || select.length === 0}
            onClick={() => handleClose(true, "here")}
          >
            Submit
          </button> */}
				</DialogActions>
			</Dialog>
			<CustomizedSnackbars success={false} message={!success && errorMessage} ref={snackbarBtnRef} />
			<ReportSuccessModal question_id={question_id} isOpen={success} />
		</div>
	);
}

export { ReportDialogLong };
