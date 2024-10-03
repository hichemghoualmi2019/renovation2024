# Running Unit Tests

## Table of Contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Setting Up Testing Environment](#setting-up-testing-environment)
4. [Running Tests](#running-tests)
5. [Understanding the Tests](#understanding-the-tests)

## Introduction
This document provides a guide on how to run unit tests for your **renovation projects API** using **Jest** as the testing framework. The tests include utility functions for filtering, ordering, and pagination.

## Prerequisites
Before running the tests, ensure that the following are installed and properly set up:

1. **Node.js** (v14+ recommended)
2. **npm** for package management
3. **Jest** as the testing framework

Run All Tests: To run the tests, use the following command:
npm run test
This command will execute all the test cases defined.

Run Tests with Coverage: If you want to run the tests with coverage, use:
npm run test -- --coverage