#!/usr/bin/env node
import {main} from '../lib/main'

const [, , ...args] = process.argv

main(...args as any)
