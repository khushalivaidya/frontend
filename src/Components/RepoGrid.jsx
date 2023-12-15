import React, { useEffect, useState, useMemo } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import Alert from "@mui/material/Alert";
import link_icon from "../Images/external-link.svg";

const RepoGrid = () => {
    const [rows, setRows] = useState([]);
    const paginationPageSizeSelector = useMemo(() => {
        return [10, 50, 100];
    }, []);
    const [paginationSize, setPaginationSize] = useState(10);
    const [pageNumber, setPageNumber] = useState(1);
    const apiUrl = `https://api.github.com/search/repositories?q=created:2019-01-10&sort=stars&order=desc&per_page=${paginationSize}&page=${pageNumber}`;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setPageNumber(1);
    }, [paginationSize]);

    useEffect(() => {
        async function fetchRepos() {
            try {
                setIsLoading(true);
                const response = await axios.get(apiUrl);
                setRows(response?.data?.items);
                setIsLoading(false);
            } catch {
                // setIsLoading(false);
                setPageNumber(1);
            }
        }

        fetchRepos();
    }, [pageNumber, paginationSize, apiUrl]);

    const handlePrevious = () => {
        setPageNumber(pageNumber - 1);
    };

    const handleNext = () => {
        setPageNumber(pageNumber + 1);
    };

    return (
        <div className="app-container">
            <div className="app-header">
                <div className="pagination-section">
                    <div className="pagination-left">
                        Page Size:{" "}
                        <div>
                            <FormControl
                                fullWidth
                                size="small"
                                disabled={isLoading}
                            >
                                <Select
                                    value={paginationSize}
                                    onChange={(event) =>
                                        setPaginationSize(event.target.value)
                                    }
                                >
                                    {paginationPageSizeSelector.map((val) => (
                                        <MenuItem value={val}> {val}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="pagination-section-right">
                        <button
                            onClick={handlePrevious}
                            disabled={pageNumber === 1 || isLoading}
                            className="pagination-btn"
                        >
                            Previous Page
                        </button>
                        <div className="current-page">Page: {pageNumber}</div>
                        <button
                            onClick={handleNext}
                            disabled={isLoading}
                            className="pagination-btn"
                        >
                            Next Page
                        </button>
                    </div>
                </div>
            </div>
            {isLoading ? (
                <div className="loading-spinner"></div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th className="name-col">Name</th>
                            <th className="owner-col">Owner</th>
                            <th className="description-col-head">
                                Description
                            </th>
                            <th className="star-col">Stars_count</th>
                            <th className="url-col">URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr>
                                <td className="name-col">{row.name}</td>
                                <td className="owner-col">{row.owner.login}</td>
                                <td className="description-col">
                                    {row.description}
                                </td>
                                <td className="star-col">
                                    {row.stargazers_count}
                                </td>
                                <td className="url-col">
                                    <a href={row.html_url} target="blank">
                                        <img
                                            src={link_icon}
                                            alt="Link to Repo"
                                        />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
export default RepoGrid;
