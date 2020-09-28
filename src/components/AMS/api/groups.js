import { sendSystemMessage } from 'store/messages';

import { postJson } from "./utils"

import { AUTH_HOST, PROJECT_NAME } from 'config';

export const GET_GROUPS = "GET_GROUPS";

export const getGroups = () =>
	(dispatch, getState) => {
		const { token } = getState().user;
		if (token) {
			return postJson(`${ AUTH_HOST }/groups`, { token })
				.then(res => {
					if (res.error) {
						dispatch(sendSystemMessage(res.error));
					}
					else {
						dispatch({
							type: GET_GROUPS,
              ...res
						});
					}
				})
		}
		else {
			return Promise.resolve();
		}
	}

export const groupsForProject = project =>
	(dispatch, getState) => {
		const { token } = getState().user;
		if (token) {
			return postJson(`${ AUTH_HOST }/groups/byproject`, { token, project: PROJECT_NAME })
				.then(res => {
					if (res.error) {
						dispatch(sendSystemMessage(res.error));
					}
					else {
						dispatch({
							type: GET_GROUPS,
              ...res
						});
					}
				})
		}
		else {
			return Promise.resolve();
		}
	}

export const createGroup = name =>
	(dispatch, getState) => {
		const { token } = getState().user;
		if (token) {
			return postJson(`${ AUTH_HOST }/group/create`, { token, name })
				.then(res => {
					if (res.error) {
						dispatch(sendSystemMessage(res.error));
					}
					else {
						dispatch(getGroups());
						if (res.message) {
							dispatch(sendSystemMessage(res.message));
						}
					}
				})
		}
		else {
			return Promise.resolve();
		}
	}
export const deleteGroup = name =>
	(dispatch, getState) => {
		const { token } = getState().user;
		if (token) {
			return postJson(`${ AUTH_HOST }/group/delete`, { token, name })
				.then(res => {
					if (res.error) {
						dispatch(sendSystemMessage(res.error));
					}
					else {
						dispatch(getGroups());
						if (res.message) {
							dispatch(sendSystemMessage(res.message));
						}
					}
				})
		}
		else {
			return Promise.resolve();
		}
	}
export const createAndAssign = (group_name, project_name, auth_level) =>
	(dispatch, getState) => {
		const { token } = getState().user;
		if (token) {
			return postJson(`${ AUTH_HOST }/group/create/project/assign`, { token, group_name, project_name: PROJECT_NAME, auth_level })
				.then(res => {
					if (res.error) {
						dispatch(sendSystemMessage(res.error));
					}
					else {
						dispatch(getGroups());
						if (res.message) {
							dispatch(sendSystemMessage(res.message));
						}
					}
				})
		}
		else {
			return Promise.resolve();
		}
	}

export const assignToProject = (group_name, project_name, auth_level) =>
	(dispatch, getState) => {
		const { token } = getState().user;
		if (token) {
			return postJson(`${ AUTH_HOST }/group/project/assign`, { token, group_name, project_name: PROJECT_NAME, auth_level })
				.then(res => {
					if (res.error) {
						dispatch(sendSystemMessage(res.error));
					}
					else {
						dispatch(getGroups());
						if (res.message) {
							dispatch(sendSystemMessage(res.message));
						}
					}
				})
		}
		else {
			return Promise.resolve();
		}
	}
export const removeFromProject = (group_name, project_name) =>
	(dispatch, getState) => {
		const { token } = getState().user;
		if (token) {
			return postJson(`${ AUTH_HOST }/group/project/remove`, { token, group_name, project_name: PROJECT_NAME })
				.then(res => {
					if (res.error) {
						dispatch(sendSystemMessage(res.error));
					}
					else {
						dispatch(getGroups());
						if (res.message) {
							dispatch(sendSystemMessage(res.message));
						}
					}
				})
		}
		else {
			return Promise.resolve();
		}
	}

export const adjustAuthLevel = (group_name, project_name, auth_level) =>
	(dispatch, getState) => {
		const { token } = getState().user;
		if (token) {
			return postJson(`${ AUTH_HOST }/group/project/adjust`, { token, group_name, project_name: PROJECT_NAME, auth_level })
				.then(res => {
					if (res.error) {
						dispatch(sendSystemMessage(res.error));
					}
					else {
						dispatch(getGroups());
						if (res.message) {
							dispatch(sendSystemMessage(res.message));
						}
					}
				})
		}
		else {
			return Promise.resolve();
		}
	}
